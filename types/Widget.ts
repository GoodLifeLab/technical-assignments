export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Metric {
  id: number
  code: string
  name: string
}

export const formatWidgetType = (type: string): string => {
  return type
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// 위젯 데이터에 대한 공통 인터페이스
export type WidgetData = Array<{
  id: number
  user: {
    gender: Gender | null
    birth_date: string | null
  }
  userInCompany: {
    position: string | null
    group: string | null
  }
  scores: Record<number, number> // metric.id -> score
}>

export interface Widget<TConfig> {
  type: string
  name: string
  config: TConfig
  metrics: Array<{
    metric: {
      id: number
      name: string
    }
    order: number
  }>
}

// 모든 위젯 설정의 기본 인터페이스
export interface BaseWidgetConfig {}

// 위젯 컴포넌트에 대한 공통 Props 인터페이스
export interface BaseWidgetProps<TConfig extends BaseWidgetConfig> {
  widget: Widget<TConfig>
  data: WidgetData
}
