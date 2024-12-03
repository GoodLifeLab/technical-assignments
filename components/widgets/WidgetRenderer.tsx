import "@/components/widgets" // 위젯 등록을 위한 사이드 이펙트 import

import {
  getWidgetComponent,
  validateWidgetConfig,
  AjvError,
} from "@/lib/widgetRegistry"
import { WidgetData, Metric } from "@/types/Widget"

export interface WidgetInput {
  type: string
  name: string
  config: unknown
  metrics: Array<{
    metric: Metric
    order: number
  }>
}

interface WidgetRendererProps {
  widget: WidgetInput
  data: WidgetData
}

export function WidgetRenderer({ widget, data }: WidgetRendererProps) {
  try {
    const validatedConfig = validateWidgetConfig(widget.type, widget.config)
    const WidgetComponent = getWidgetComponent(widget.type)

    // widget prop 재구성
    const widgetWithValidConfig = {
      type: widget.type,
      name: widget.name,
      config: validatedConfig,
      metrics: widget.metrics,
    }

    // 렌더링
    return <WidgetComponent widget={widgetWithValidConfig} data={data} />
  } catch (error) {
    if (error instanceof AjvError) {
      return (
        <div className="rounded border border-red-500 p-4">
          <h3 className="font-medium text-red-500">위젯 설정 오류</h3>
          <ul className="mt-2 list-inside list-disc text-sm text-red-700">
            {error.errors.map((err, index) => (
              <li key={index}>
                {err.instancePath}: {err.message}
                {err.params && ` (${JSON.stringify(err.params)})`}
              </li>
            ))}
          </ul>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              설정 내용 보기
            </summary>
            <pre className="mt-2 rounded bg-gray-50 p-2 text-sm text-gray-600">
              {JSON.stringify(widget.config, null, 2)}
            </pre>
          </details>
        </div>
      )
    }

    // Config 검증 에러만 처리하고 나머지는 다시 throw
    throw error
  }
}
