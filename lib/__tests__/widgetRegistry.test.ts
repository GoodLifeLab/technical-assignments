import { JSONSchema7 } from "json-schema"

import { BaseWidgetProps } from "@/types/Widget"

import {
  registerWidget,
  validateWidgetConfig,
  AjvError,
} from "../widgetRegistry"

// 테스트를 위한 더미 위젯 컴포넌트
function DummyWidget(props: BaseWidgetProps<any>) {
  return null
}

describe("Widget Registry", () => {
  describe("registerWidget", () => {
    const baseSchema: JSONSchema7 = {
      type: "object",
      properties: {
        title: { type: "string" },
        value: { type: "number" },
      },
      required: ["value"],
      additionalProperties: false,
    }

    it("should register widget with base schema only", () => {
      expect(() =>
        registerWidget("STANDARD_BAR", DummyWidget, baseSchema),
      ).not.toThrow()
    })

    it("should throw on invalid base schema", () => {
      const invalidSchema: JSONSchema7 = {
        type: "invalid" as any,
      }

      expect(() =>
        registerWidget("RADAR_PENTAGON", DummyWidget, invalidSchema),
      ).toThrow()
    })
  })

  describe("validateWidgetConfig", () => {
    const schema: JSONSchema7 = {
      type: "object",
      properties: {
        value: { type: "number", minimum: 0, maximum: 100 },
      },
      required: ["value"],
      additionalProperties: false,
    }

    beforeEach(() => {
      registerWidget("STANDARD_BAR", DummyWidget, schema)
    })

    it("should validate correct config", () => {
      const config = { value: 50 }
      expect(() => validateWidgetConfig("STANDARD_BAR", config)).not.toThrow()
    })

    it("should remove additional properties", () => {
      const config = { value: 50, extra: "test" }
      const validated = validateWidgetConfig("STANDARD_BAR", config)
      expect(validated).toEqual({ value: 50 })
    })

    it("should throw on missing required property", () => {
      const config = {}
      expect(() => validateWidgetConfig("STANDARD_BAR", config)).toThrow(
        AjvError,
      )
    })

    it("should throw on invalid value", () => {
      const config = { value: 150 }
      expect(() => validateWidgetConfig("STANDARD_BAR", config)).toThrow(
        AjvError,
      )
    })

    it("should throw on unknown widget type", () => {
      expect(() => validateWidgetConfig("UNKNOWN", {})).toThrow(
        "Unknown widget type",
      )
    })
  })
})
