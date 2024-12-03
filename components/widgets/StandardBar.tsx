import { Tab } from "@headlessui/react"
import clsx from "clsx"
import { JSONSchema7 } from "json-schema"
import { useState } from "react"

import { registerWidget } from "@/lib/widgetRegistry"
import { BaseWidgetConfig, BaseWidgetProps } from "@/types/Widget"

export interface StandardBarConfig extends BaseWidgetConfig {
  descriptions: {
    all: string // 전체 탭 설명
    position: string // 직급 탭 설명
    age: string // 연령 탭 설명
  }
  ranges: {
    risk: number // risk 미만: 위험
    concern: number // concern 미만: 염려
    good: number // good 미만: 양호, 이상: 최상
  }
  benchmarks?: {
    otherCompanies?: number
    nationalAverage?: number
  }
}

const standardBarConfigSchema: JSONSchema7 = {
  type: "object",
  title: "Standard Bar 설정",
  properties: {
    descriptions: {
      type: "object",
      title: "탭별 설명",
      properties: {
        all: {
          type: "string",
          title: "전체 탭 설명",
          description:
            "'전체' 탭이 선택되었을 때 위젯 상단에 표시될 설명 텍스트",
        },
        position: {
          type: "string",
          title: "직급 탭 설명",
          description:
            "'직급' 탭이 선택되었을 때 위젯 상단에 표시될 설명 텍스트",
        },
        age: {
          type: "string",
          title: "연령 탭 설명",
          description:
            "'연령' 탭이 선택되었을 때 위젯 상단에 표시될 설명 텍스트",
        },
      },
      required: ["all", "position", "age"],
    },
    ranges: {
      type: "object",
      title: "범위 설정",
      properties: {
        risk: {
          type: "number",
          title: "위험 기준값",
          description: "이 값 미만이면 위험으로 판단",
        },
        concern: {
          type: "number",
          title: "염려 기준값",
          description: "이 값 미만이면 염려로 판단",
        },
        good: {
          type: "number",
          title: "양호 기준값",
          description: "이 값 미만이면 양호, 이상이면 최상으로 판단",
        },
      },
      required: ["risk", "concern", "good"],
    },
    benchmarks: {
      type: "object",
      title: "벤치마크 설정",
      description: "설정되지 않은 항목은 표시되지 않습니다.",
      properties: {
        otherCompanies: {
          type: "number",
          title: "타기업 평균",
        },
        nationalAverage: {
          type: "number",
          title: "대한민국 평균",
        },
      },
    },
  },
  required: ["descriptions", "ranges"],
  additionalProperties: false,
}

export function StandardBar({
  widget,
  data,
}: BaseWidgetProps<StandardBarConfig>) {
  const [selectedTab, setSelectedTab] = useState(0)
  const metricId = widget.metrics[0]?.metric.id

  if (!metricId) {
    return <div>메트릭이 설정되지 않았습니다.</div>
  }

  const tabs = ["전체", "직급", "연령"]
  const groupBy =
    selectedTab === 1 ? "position" : selectedTab === 2 ? "age" : undefined

  return (
    <div className="flex h-full flex-col">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        {/* Header */}
        <div className="flex flex-col border-b-2 border-btl-primary-opacity-4 lg:flex-row">
          {/* Title */}
          <h3
            className={clsx(
              "px-6 pb-3 pt-4 text-body3-14-b text-btl-grayscale-900",
              "bg-btl-primary-100 lg:flex-1",
              "border-b-2 border-btl-primary-opacity-4 lg:border-none",
            )}
          >
            {widget.name}
          </h3>

          {/* Tabs */}
          <div className="relative lg:bg-btl-primary-100">
            <Tab.List className="flex px-3">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    clsx(
                      // 기본 스타일
                      "text-body3-14-b text-btl-grayscale-900",
                      "focus:outline-none",
                      "pt-4",
                      // Active/Inactive 상태별 스타일
                      selected
                        ? clsx(
                            "border-b-2 border-btl-primary-600",
                            "pb-[10px]",
                            // Active 상태: margin으로 간격 조정
                            "mx-3",
                          )
                        : clsx(
                            "pb-[12px]",
                            // Inactive 상태: padding으로 간격 조정
                            "px-3",
                            // Hover 스타일 - Active가 아닐 때만 적용
                            "hover:rounded-t-lg",
                            "hover:bg-btl-grayscale-transparent-black-opacity-4",
                          ),
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-4">
          <p className="text-heading4-20-b text-btl-grayscale-900">
            {selectedTab === 0 && widget.config.descriptions.all}
            {selectedTab === 1 && widget.config.descriptions.position}
            {selectedTab === 2 && widget.config.descriptions.age}
          </p>
        </div>

        {/* Tab Content: Graph */}
        <Tab.Panels className="flex-1">
          <Tab.Panel className="px-6 pb-14 pt-5">{/* 그래프 내용 */}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

registerWidget("STANDARD_BAR", StandardBar, standardBarConfigSchema)
