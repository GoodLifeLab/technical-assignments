import { Tab } from "@headlessui/react"
import clsx from "clsx"
import { JSONSchema7 } from "json-schema"
import { useState } from "react"

import { registerWidget } from "@/lib/widgetRegistry"
import { BaseWidgetConfig, BaseWidgetProps } from "@/types/Widget"

/**
 * 위젯 설정 스키마와 인터페이스
 */

// 위젯 설정 인터페이스
export interface ThinBarConfig extends BaseWidgetConfig {
  // 여기에 위젯 설정 속성을 추가하세요
}

// 위젯 설정 스키마
const thinBarConfigSchema: JSONSchema7 = {
  type: "object",
  title: "Thin Bar 설정",
  properties: {
    // 여기에 스키마 속성을 추가하세요
  },
  required: [], // 필수 속성을 수정하세요
  additionalProperties: false,
}

/**
 * 메인 위젯 컴포넌트
 * 아래 컴포넌트에서 데이터를 렌더링하고 사용자 인터페이스를 구성해야 합니다.
 */
export function ThinBar({ widget, data }: BaseWidgetProps<ThinBarConfig>) {
  return <div>{/* 데이터를 렌더링하세요 */}</div>
}

/**
 * 위젯 등록
 */
registerWidget(
  "THIN_BAR", // 위젯 유형
  ThinBar, // 컴포넌트 이름
  thinBarConfigSchema, // 설정 스키마
)
