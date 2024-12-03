import Ajv, { ErrorObject } from "ajv"
import addFormats from "ajv-formats"
import localize from "ajv-i18n"
import { JSONSchema7 } from "json-schema"

import { BaseWidgetConfig, BaseWidgetProps } from "@/types/Widget"

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  validateFormats: true,
  removeAdditional: "all", // 스키마에 없는 데이터 제거
})
addFormats(ajv)

interface WidgetRegistryItem<TConfig extends BaseWidgetConfig> {
  component: React.ComponentType<BaseWidgetProps<TConfig>>
  configSchema: JSONSchema7
}

export const widgetRegistry = new Map<string, WidgetRegistryItem<any>>()

// AJV 에러를 위한 커스텀 에러 클래스
export class AjvError extends Error {
  constructor(
    message: string,
    public errors: ErrorObject[],
  ) {
    super(message)
    this.name = "AjvError"
  }
}

export function registerWidget<TConfig extends BaseWidgetConfig>(
  type: string,
  component: React.ComponentType<BaseWidgetProps<TConfig>>,
  configSchema: JSONSchema7,
) {
  // Schema 컴파일 및 캐싱
  ajv.compile(configSchema)

  widgetRegistry.set(type, {
    component,
    configSchema,
  })
}

export function validateWidgetConfig<TConfig extends BaseWidgetConfig>(
  type: string,
  config: unknown,
): TConfig {
  const registry = widgetRegistry.get(type)
  if (!registry) {
    throw new Error(`Unknown widget type: ${type}`)
  }

  const validate = ajv.compile(registry.configSchema)
  const valid = validate(config)

  if (!valid) {
    localize.ko(validate.errors)
    throw new AjvError("Config validation failed", validate.errors ?? [])
  }

  return config as TConfig
}

export function getWidgetComponent<TConfig extends BaseWidgetConfig>(
  type: string,
): React.ComponentType<BaseWidgetProps<TConfig>> {
  const registry = widgetRegistry.get(type)
  if (!registry) {
    throw new Error(`Unknown widget type: ${type}`)
  }

  return registry.component
}

export function getWidgetSchema(type: string): JSONSchema7 {
  const registry = widgetRegistry.get(type)
  if (!registry) {
    throw new Error(`Unknown widget type: ${type}`)
  }

  return registry.configSchema
}

export { ajv }
