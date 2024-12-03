import React, { useState } from "react"
import toast from "react-hot-toast"

import { WidgetForm } from "@/components/admin/WidgetForm"
import { Metric } from "@/types/Widget"

const METRICS: Metric[] = [
  { id: 31, code: "boa", name: "번아웃지수" },
  { id: 30, code: "rel", name: "관계감" },
  { id: 29, code: "com", name: "유능감" },
  { id: 28, code: "auto", name: "자율감" },
  { id: 27, code: "mlw", name: "일터의미" },
  { id: 26, code: "wc", name: "일몰입" },
  { id: 25, code: "oc", name: "조직몰입" },
  { id: 24, code: "jobs", name: "직무만족감" },
  { id: 23, code: "haw", name: "일터행복지수" },
  { id: 22, code: "finwell", name: "경제적웰니스" },
  { id: 21, code: "carwell", name: "커리어웰니스" },
  { id: 20, code: "phywell", name: "신체적웰니스" },
  { id: 19, code: "socwell", name: "사회적웰니스" },
  { id: 18, code: "psywell", name: "심리적웰니스" },
  { id: 17, code: "ope", name: "개방성" },
  { id: 16, code: "neu", name: "신경증성향" },
  { id: 15, code: "agr", name: "우호성" },
  { id: 14, code: "con", name: "성실성" },
  { id: 13, code: "ext", name: "외향성" },
  { id: 12, code: "sts", name: "스트레스" },
  { id: 11, code: "na", name: "부정정서" },
  { id: 10, code: "pa", name: "긍정정서" },
  { id: 9, code: "ml", name: "삶의의미" },
  { id: 8, code: "ls", name: "삶의만족" },
  { id: 7, code: "GLI", name: "개인행복지수" },
  { id: 6, code: "raeds", name: "보상과 평가 불만족" },
  { id: 5, code: "wload", name: "과도한 업무량" },
  { id: 4, code: "int", name: "위축" },
  { id: 3, code: "cyn", name: "냉소" },
  { id: 2, code: "exh", name: "탈진" },
]

export default function GLL_Widget_NewPage() {
  const [name, setName] = useState("")
  const [type, setType] = useState<string | null>(null)
  const [config, setConfig] = useState("{\n  \n}")
  const [selectedMetrics, setSelectedMetrics] = useState<
    Array<{ metric: Metric; order: number }>
  >([])

  const handleAddMetric = (selectedId: string) => {
    const newMetric = METRICS.find((m) => m.id === parseInt(selectedId))
    if (!newMetric) return

    if (selectedMetrics.some((sm) => sm.metric.id === newMetric.id)) {
      toast.error("이미 추가된 지표입니다.")
      return
    }

    setSelectedMetrics([
      ...selectedMetrics,
      { metric: newMetric, order: selectedMetrics.length },
    ])
  }

  return (
    <section className="mt-8 pb-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <WidgetForm
            name={name}
            type={type}
            selectedMetrics={selectedMetrics}
            config={config}
            availableMetrics={METRICS}
            onNameChange={setName}
            onTypeChange={setType}
            onConfigChange={setConfig}
            onAddMetric={handleAddMetric}
            onRemoveMetric={(metricId) =>
              setSelectedMetrics(
                selectedMetrics.filter((sm) => sm.metric.id !== metricId),
              )
            }
            onMetricOrderChange={(metricId, newOrder) =>
              setSelectedMetrics(
                selectedMetrics.map((sm) =>
                  sm.metric.id === metricId ? { ...sm, order: newOrder } : sm,
                ),
              )
            }
          />
        </div>
      </div>
    </section>
  )
}
