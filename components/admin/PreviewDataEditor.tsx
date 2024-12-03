import { TrashIcon } from "@heroicons/react/24/outline"
import React from "react"

import { WidgetData, Metric, Gender } from "@/types/Widget"

import { FormInput } from "./FormInput"

interface PreviewDataEditorProps {
  data: WidgetData
  onDataChange: (data: WidgetData) => void
  metrics: Metric[]
}

export const PreviewDataEditor: React.FC<PreviewDataEditorProps> = ({
  data,
  onDataChange,
  metrics,
}) => {
  const handleInputChange = (
    index: number,
    field: string,
    value: string,
    metricId?: number,
  ) => {
    const newData = [...data]
    const row = { ...newData[index] }

    switch (field) {
      case "gender":
        row.user = { ...row.user, gender: value as Gender }
        break
      case "birth_date":
        row.user = { ...row.user, birth_date: value }
        break
      case "position":
      case "group":
        row.userInCompany = { ...row.userInCompany, [field]: value }
        break
      default:
        if (metricId) {
          row.scores = { ...row.scores, [metricId]: parseFloat(value) }
        }
    }

    newData[index] = row
    onDataChange(newData)
  }

  const addRow = () => {
    const newRow: WidgetData[0] = {
      id: Date.now(), // 임시 ID
      user: {
        gender: undefined,
        birth_date: "",
      },
      userInCompany: {
        position: "",
        group: "",
      },
      scores: Object.fromEntries(metrics.map((m) => [m.id, 0])),
    }
    onDataChange([...data, newRow])
  }

  const removeRow = (index: number) => {
    onDataChange(data.filter((_, i) => i !== index))
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-btl-grayscale-200">
        <thead className="bg-btl-grayscale-50">
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900">
              성별
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900">
              생년월일
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900">
              직급
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900">
              팀
            </th>
            {metrics.map((metric) => (
              <th
                key={metric.id}
                className="px-3 py-3.5 text-left text-sm font-semibold text-btl-grayscale-900"
              >
                {metric.name}
              </th>
            ))}
            <th className="w-16" />
          </tr>
        </thead>
        <tbody className="divide-y divide-btl-grayscale-200 bg-white">
          {data.map((row, index) => (
            <tr key={row.id}>
              <td className="px-3 py-4 text-sm text-btl-grayscale-900">
                <FormInput
                  label=""
                  name={`gender-${index}`}
                  type="select"
                  value={row.user.gender}
                  onChange={(value) =>
                    handleInputChange(index, "gender", value as string)
                  }
                  options={[
                    { value: Gender.MALE, label: "남성" },
                    { value: Gender.FEMALE, label: "여성" },
                  ]}
                />
              </td>
              <td className="px-3 py-4 text-sm text-btl-grayscale-900">
                <FormInput
                  label=""
                  name={`birth_date-${index}`}
                  type="date"
                  value={row.user.birth_date}
                  onChange={(value) =>
                    handleInputChange(index, "birth_date", value as string)
                  }
                />
              </td>
              <td className="px-3 py-4 text-sm text-btl-grayscale-900">
                <FormInput
                  label=""
                  name={`position-${index}`}
                  type="text"
                  value={row.userInCompany.position}
                  onChange={(value) =>
                    handleInputChange(index, "position", value as string)
                  }
                />
              </td>
              <td className="px-3 py-4 text-sm text-btl-grayscale-900">
                <FormInput
                  label=""
                  name={`group-${index}`}
                  type="text"
                  value={row.userInCompany.group}
                  onChange={(value) =>
                    handleInputChange(index, "group", value as string)
                  }
                />
              </td>
              {metrics.map((metric) => (
                <td
                  key={metric.id}
                  className="px-3 py-4 text-sm text-btl-grayscale-900"
                >
                  <FormInput
                    label=""
                    name={`metric-${metric.id}-${index}`}
                    type="number"
                    value={row.scores[metric.id]?.toString() || ""}
                    onChange={(value) =>
                      handleInputChange(
                        index,
                        "metric",
                        value as string,
                        metric.id,
                      )
                    }
                  />
                </td>
              ))}
              <td className="px-3 py-4">
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="text-btl-grayscale-400 hover:text-btl-red-500"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={metrics.length + 5}
                className="py-4 text-center text-btl-grayscale-500"
              >
                데이터가 없습니다. 아래 버튼을 눌러 행을 추가하세요.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={addRow}
          className="rounded-md bg-btl-primary-500 px-3 py-2 text-sm font-semibold text-white hover:bg-btl-primary-600"
        >
          행 추가
        </button>
      </div>
    </div>
  )
}
