import "@/components/widgets" // 위젯 등록을 위한 사이드 이펙트 import
import { TrashIcon } from "@heroicons/react/24/outline"
import validator from "@rjsf/validator-ajv8"
import dynamic from "next/dynamic"
import React, { useState } from "react"

import { WidgetRenderer } from "@/components/widgets/WidgetRenderer"
import { getWidgetSchema, widgetRegistry } from "@/lib/widgetRegistry"
import { formatWidgetType, WidgetData, Metric } from "@/types/Widget"

import { FormInput } from "./FormInput"
import { PreviewContainer } from "./PreviewContainer"
import { PreviewDataEditor } from "./PreviewDataEditor"

const Form = dynamic(
  () => import("@rjsf/material-ui").then((mod) => mod.Form),
  {
    ssr: false,
  },
)

interface WidgetFormProps {
  name: string
  type: string | null
  selectedMetrics: Array<{
    metric: Metric
    order: number
  }>
  config: string
  availableMetrics: Metric[]
  onNameChange: (value: string) => void
  onTypeChange: (value: string) => void
  onConfigChange: (value: string) => void
  onAddMetric: (metricId: string) => void
  onRemoveMetric: (metricId: number) => void
  onMetricOrderChange: (metricId: number, newOrder: number) => void
}

export const WidgetForm: React.FC<WidgetFormProps> = ({
  name,
  type,
  selectedMetrics,
  config,
  availableMetrics,
  onNameChange,
  onTypeChange,
  onConfigChange,
  onAddMetric,
  onRemoveMetric,
  onMetricOrderChange,
}) => {
  const [previewData, setPreviewData] = useState<WidgetData>([])

  // Get all widget types from registry
  const widgetTypeOptions = Array.from(widgetRegistry.keys()).map((type) => ({
    value: type,
    label: formatWidgetType(type),
  }))

  const metricOptions = availableMetrics
    .filter(
      (metric) =>
        !selectedMetrics.some((selected) => selected.metric.id === metric.id),
    )
    .map((metric) => ({
      value: metric.id.toString(),
      label: `${metric.name} (${metric.code})`,
    }))

  // Get schema only if type is selected
  const configSchema = type ? getWidgetSchema(type) : null

  return (
    <div className="space-y-12">
      {/* 기본 정보 */}
      <div className="border-b border-btl-grayscale-200 pb-12">
        <h2 className="text-base font-semibold leading-7 text-btl-grayscale-900">
          위젯 기본 정보
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-6">
          <FormInput
            label="위젯명"
            name="name"
            type="text"
            value={name}
            onChange={onNameChange}
            required
            className="sm:col-span-3"
          />
          <FormInput
            label="위젯 유형"
            name="type"
            type="select"
            value={type || ""}
            onChange={onTypeChange}
            options={widgetTypeOptions}
            required
            className="sm:col-span-3"
          />
        </div>
      </div>

      {/* 지표 관리 */}
      <div className="border-b border-btl-grayscale-200 pb-12">
        <h2 className="text-base font-semibold leading-7 text-btl-grayscale-900">
          지표 관리
        </h2>

        {/* 지표 추가 Combobox */}
        <div className="mt-6">
          <FormInput
            label="지표 추가"
            name="add_metric"
            type="combobox"
            value=""
            onChange={(id) => onAddMetric(id as string)}
            options={metricOptions}
            placeholder="지표명 또는 코드로 검색"
            className="sm:col-span-6"
          />
        </div>

        {/* 선택된 지표 테이블 */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-btl-grayscale-200">
            <thead className="bg-btl-grayscale-50">
              <tr>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900">
                  지표명
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900">
                  지표 코드
                </th>
                <th className="px-3 py-3.5 text-center text-sm font-semibold text-btl-grayscale-900">
                  순서
                </th>
                <th className="px-3 py-3.5 text-center text-sm font-semibold text-btl-grayscale-900">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-btl-grayscale-200 bg-white">
              {selectedMetrics
                .sort((a, b) => a.order - b.order)
                .map(({ metric, order }) => (
                  <tr key={metric.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-btl-grayscale-900">
                      {metric.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-btl-grayscale-900">
                      {metric.code}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-center">
                      <FormInput
                        label=""
                        name={`metric-order-${metric.id}`}
                        type="number"
                        value={order.toString()}
                        onChange={(value) =>
                          onMetricOrderChange(metric.id, parseInt(value))
                        }
                        min="0"
                        className="mx-auto w-24"
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => onRemoveMetric(metric.id)}
                          className="text-btl-grayscale-400 hover:text-btl-red-500"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {selectedMetrics.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-btl-grayscale-500"
                  >
                    선택된 지표가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 설정 */}
      {type && configSchema && (
        <div className="border-b border-btl-grayscale-200 pb-12">
          <h2 className="text-base font-semibold leading-7 text-btl-grayscale-900">
            설정
          </h2>
          <div className="mt-6">
            <Form
              schema={configSchema}
              formData={JSON.parse(config)}
              validator={validator}
              onChange={(e) =>
                onConfigChange(JSON.stringify(e.formData, null, 2))
              }
              tagName="div"
            >
              <React.Fragment />
            </Form>
          </div>
        </div>
      )}

      {/* 미리보기 섹션 */}
      {selectedMetrics.length > 0 && type && (
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-btl-grayscale-900">
            미리보기
          </h2>

          {/* 예시 데이터 편집기 */}
          <div className="mt-6 border-b border-btl-grayscale-200 pb-6">
            <h3 className="mb-4 text-sm font-medium text-btl-grayscale-700">
              예시 데이터
            </h3>
            <PreviewDataEditor
              data={previewData}
              onDataChange={setPreviewData}
              metrics={selectedMetrics.map((sm) => sm.metric)}
            />
          </div>

          {/* 위젯 미리보기 */}
          <div className="mt-6">
            <h3 className="mb-4 text-sm font-medium text-btl-grayscale-700">
              위젯 미리보기
            </h3>
            <div className="flex justify-center">
              <PreviewContainer>
                <WidgetRenderer
                  widget={{
                    type,
                    name,
                    config: JSON.parse(config),
                    metrics: selectedMetrics,
                  }}
                  data={previewData}
                />
              </PreviewContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
