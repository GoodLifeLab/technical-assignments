# 위젯 추가 매뉴얼

## 1. 기본 구조

위젯 시스템은 다음과 같은 디렉토리 구조를 따릅니다:

```
├── types/
│   └── Widget.ts              # 기본 위젯 타입 정의
├── components/
│   └── widgets/
│       ├── index.ts           # 위젯 등록 및 내보내기
│       ├── WidgetRenderer.tsx # 위젯 렌더링 컴포넌트
│       └── [WidgetName].tsx   # 각 위젯 구현
└── lib/
    └── widgetRegistry.ts       # 위젯 레지스트리
```

## 2. 위젯 추가 단계

### 2.1. 위젯 구현 구조

각 위젯 파일은 다음 구조를 따릅니다:

1. Config 인터페이스 정의
2. Config 스키마 정의 (JSON Schema)
3. Customizable Config 스키마 정의 (선택적)
4. 메인 위젯 컴포넌트 구현
5. 위젯 등록

### 2.2. 예시 코드

```typescript
// components/widgets/StandardBar.tsx
import { JSONSchema7 } from "json-schema";
import { BaseWidgetConfig, BaseWidgetProps } from "@/types/Widget";
import { registerWidget } from "@/lib/widgetRegistry";

// 1. Config 인터페이스 정의
interface StandardBarConfig extends BaseWidgetConfig {
  descriptions: {
    all: string;
    position: string;
    age: string;
  };
  ranges: {
    risk: number;
    concern: number;
    good: number;
  };
}

// 2. 기본 Config 스키마 정의
const configSchema: JSONSchema7 = {
  type: "object",
  properties: {
    descriptions: {
      type: "object",
      properties: {
        all: { type: "string" },
        position: { type: "string" },
        age: { type: "string" }
      },
      required: ["all", "position", "age"]
    },
    ranges: {
      type: "object",
      properties: {
        risk: { type: "number" },
        concern: { type: "number" },
        good: { type: "number" }
      },
      required: ["risk", "concern", "good"]
    }
  },
  required: ["descriptions", "ranges"],
  additionalProperties: false
};

// 3. Customizable Config 스키마 정의 (선택적)
const customizableConfigSchema: JSONSchema7 = {
  type: "object",
  properties: {
    descriptions: {
      type: "object",
      properties: {
        all: { type: "string" },
        position: { type: "string" },
        age: { type: "string" }
      }
    }
  },
  additionalProperties: false
};

// 4. 메인 위젯 컴포넌트: 위젯이 렌더링할 UI를 구현합니다. 이 컴포넌트는 `BaseWidgetProps` 제네릭 타입을 사용해 위젯 타입을 안전하게 지정할 수 있습니다.
export function StandardBar({ widget, data }: BaseWidgetProps<StandardBarConfig>) {
  // 메트릭 데이터 처리

  return (
    // 렌더링
  );
}

// 5. 위젯 등록 (커스터마이징 스키마는 선택적)
registerWidget('STANDARD_BAR', StandardBar, configSchema, customizableConfigSchema);
```

### 2.3. 위젯 등록 및 내보내기

모든 위젯은 중앙 인덱스 파일에서 등록됩니다:

```typescript
// components/widgets/index.ts

// 위젯 등록을 위한 사이드 이펙트 import
import './StandardBar;
// ... 다른 위젯들
```

## 3. 위젯 사용 예시

WidgetRenderer는 위젯 타입에 따라 적절한 위젯 컴포넌트를 렌더링하는 컴포넌트입니다.

```typescript
import { WidgetRenderer } from '@/components/widgets/WidgetRenderer';
import { Widget } from '@prisma/client';
import { WidgetData } from "@/types/Widget"

// 위젯 렌더링
function SomeComponent({
  widget,  // 데이터베이스에서 가져온 위젯
  data    // Report[]와 관계 데이터 (user, userInCompany, scores)
}: {
  widget: Widget;
  data: WidgetData;
}) {
  return (
    <div className="p-4">
      <WidgetRenderer widget={widget} data={data} />
    </div>
  );
}
```
