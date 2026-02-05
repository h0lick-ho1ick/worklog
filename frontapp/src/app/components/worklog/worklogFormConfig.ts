export const GROUP_TYPE_OPTIONS = ["A조", "B조", "C조", "D조"] as const;
export const GROUP_SHIFT_OPTIONS = ["전근", "후근", "야근"] as const;
export const FACTORY_OPTIONS = [
  "CA",
  "TJ",
  "TJ1",
  "TJ2",
  "EM",
  "EM2",
  "XI",
  "HU",
  "HU1",
  "HU2",
  "SPE",
] as const;
export const CATEGORY_OPTIONS = [
  "FATAL",
  "질의",
  "긴급패치",
  "패치공지",
  "정기배포",
  "재기동",
] as const;
export const SYSTEM_OPTIONS = [
  "ADS",
  "MOS",
  "MES",
  "MCS",
  "ACS",
  "xCS",
  "SEMS",
  "EES",
  "APC",
] as const;
export const MACHINE_OPTIONS = [
  "천안 물류시스템",
  "천안 IT상황실",
  "텐진 IT상황실",
  "SDIHU 1 물류시스템",
  "SDIHU 2 물류시스템",
  "헝가리 IT 상황실",
  "시안 물류시스템",
  "시안 IT상황실",
  "말레이 물류시스템",
  "말레이 IT상황실",
  "SPE 물류시스템",
  "SPE IT 상황실",
  "SPE 화성1",
  "SDIHU 1 물류현장",
  "SDIHU 2 물류현장",
] as const;
export const STATUS_OPTIONS = ["접수", "진행중", "완료", "미확인"] as const;

export type WorklogFormState = {
  date: string;
  title: string;
  content: string;
  groupType: string;
  groupShift: string;
  factory: string;
  category: string;
  system: string;
  machine: string;
  status: string;
  assignee: string;
  authorName: string;
  startTime: string;
  endTime: string;
  note: string;
  opinion: string;
};

export const DEFAULT_FORM_STATE: WorklogFormState = {
  date: "",
  title: "",
  content: "",
  groupType: GROUP_TYPE_OPTIONS[0],
  groupShift: GROUP_SHIFT_OPTIONS[0],
  factory: FACTORY_OPTIONS[0],
  category: CATEGORY_OPTIONS[0],
  system: SYSTEM_OPTIONS[0],
  machine: MACHINE_OPTIONS[0],
  status: STATUS_OPTIONS[0],
  assignee: "",
  authorName: "",
  startTime: "",
  endTime: "",
  note: "",
  opinion: "",
};

type BaseField = {
  id: string;
  label: string;
};

type SelectField = BaseField & {
  kind: "select";
  stateKey: keyof WorklogFormState;
  options: readonly string[];
};

type TextField = BaseField & {
  kind: "text";
  stateKey: keyof WorklogFormState;
  placeholder?: string;
};

type DateField = BaseField & {
  kind: "date";
  stateKey: keyof WorklogFormState;
};

type TimeField = BaseField & {
  kind: "time";
  stateKey: keyof WorklogFormState;
};

export type WorklogFormField = SelectField | TextField | DateField | TimeField;

export const TOP_FIELDS: WorklogFormField[] = [
  { id: "date", label: "날짜", kind: "date", stateKey: "date" },
  {
    id: "groupType",
    label: "조 구분",
    kind: "select",
    stateKey: "groupType",
    options: GROUP_TYPE_OPTIONS,
  },
  {
    id: "authorName",
    label: "작성자",
    kind: "text",
    stateKey: "authorName",
    placeholder: "작성자 입력",
  },
  {
    id: "groupShift",
    label: "그룹 shift",
    kind: "select",
    stateKey: "groupShift",
    options: GROUP_SHIFT_OPTIONS,
  },
];

export const DETAIL_FIELDS: WorklogFormField[] = [
  {
    id: "factory",
    label: "공장",
    kind: "select",
    stateKey: "factory",
    options: FACTORY_OPTIONS,
  },
  {
    id: "category",
    label: "구분",
    kind: "select",
    stateKey: "category",
    options: CATEGORY_OPTIONS,
  },
  {
    id: "system",
    label: "시스템",
    kind: "select",
    stateKey: "system",
    options: SYSTEM_OPTIONS,
  },
  {
    id: "machine",
    label: "메신저 방",
    kind: "select",
    stateKey: "machine",
    options: MACHINE_OPTIONS,
  },
  {
    id: "assignee",
    label: "담당자",
    kind: "text",
    stateKey: "assignee",
    placeholder: "담당자 입력",
  },
  {
    id: "status",
    label: "상태",
    kind: "select",
    stateKey: "status",
    options: STATUS_OPTIONS,
  },
  { id: "startTime", label: "발생시간", kind: "time", stateKey: "startTime" },
  { id: "endTime", label: "완료시간", kind: "time", stateKey: "endTime" },
];

export const FOOTER_FIELDS = ["비고", "의견"];
