type type_str_type = { type: "string"; value: string };
type type_ref_type = { type: "ref"; value: string };
type type_num_type = { type: "number"; value: number };
type type_identifier_type = { type: "identifier"; value: string };
type type_function_arg = type_str_type | type_ref_type | type_num_type | type_identifier_type;
export type type_function = { alias?: string; operator: FunctionName; args: type_function_arg[]; type: "function" };
type type_orderby_arg = { field: string; direction: "asc" | "desc" };
type type_summarize_arg = type_str_type;
type type_summarize_function = { operator: FunctionName; args: type_summarize_arg[] };
export type type_summarize_assignment = { alias?: string } & type_summarize_function;
type type_summarize_item = { metrics: type_summarize_assignment[]; by: type_summarize_arg[] };
export type type_parse_arg = { identifier: string; value: string };

export type FunctionName =
  | "count"
  | "sum"
  | "diff"
  | "mul"
  | "div"
  | "min"
  | "max"
  | "mean"
  | "first"
  | "last"
  | "latest"
  | "sign"
  | "sin"
  | "cos"
  | "tan"
  | "pow"
  | "round"
  | "ceil"
  | "floor"
  | "log"
  | "log2"
  | "log10"
  | "strcat"
  | "dcount"
  | "distinct"
  | "random"
  | "toupper"
  | "tolower"
  | "strlen"
  | "trim"
  | "trim_start"
  | "trim_end"
  | "toint"
  | "tolong"
  | "tonumber"
  | "tobool"
  | "tostring"
  | "todouble"
  | "tofloat"
  | "parse_url"
  | "parse_urlquery"
  | "todatetime"
  | "tounixtime"
  | "unixtime_seconds_todatetime"
  | "unixtime_nanoseconds_todatetime"
  | "unixtime_milliseconds_todatetime"
  | "unixtime_microseconds_todatetime"
  | "format_datetime"
  | "add_datetime"
  | "startofminute"
  | "startofhour"
  | "startofday"
  | "startofmonth"
  | "startofweek"
  | "startofyear";

type CommandType =
  | "comment"
  | "hello"
  | "ping"
  | "echo"
  | "count"
  | "limit"
  | "command"
  | "orderby"
  | "project"
  | "project-away"
  | "extend"
  | "summarize"
  | "range"
  | "scope"
  | "mv-expand"
  | "parse-json"
  | "parse-csv"
  | "parse-xml"
  | "parse-yaml";
type CommandBase<T extends CommandType> = { type: T };

type CommandComment = { value: string } & CommandBase<"comment">;
type CommandHello = {} & CommandBase<"hello">;
type CommandPing = {
  value: string;
} & CommandBase<"ping">;
type CommandEcho = {
  value: string;
} & CommandBase<"echo">;
type CommandScope = { value: type_ref_type } & CommandBase<"scope">;
type CommandMvExpand = { value: type_ref_type & { alias: string } } & CommandBase<"mv-expand">;
type CommandParseJSON = { args: type_parse_arg[][] } & CommandBase<"parse-json">;
type CommandParseCSV = { args: type_parse_arg[][] } & CommandBase<"parse-csv">;
type CommandParseXML = { args: type_parse_arg[][] } & CommandBase<"parse-xml">;
type CommandParseYAML = { args: type_parse_arg[][] } & CommandBase<"parse-yaml">;
type CommandCount = {} & CommandBase<"count">;
type CommandLimit = {
  value: number;
} & CommandBase<"limit">;
type CommandCommand = {
  value: {
    type: "function";
    operator: FunctionName;
    args: type_function_arg[];
  };
} & CommandBase<"command">;
type CommandOrderBy = {
  value: type_orderby_arg[];
} & CommandBase<"orderby">;
type CommandProject = {
  value: (type_function | (type_ref_type & { alias: string }))[];
} & CommandBase<"project">;
type CommandProjectAway = {
  value: type_ref_type[];
} & CommandBase<"project-away">;
type CommandExtend = {
  value: type_function[];
} & CommandBase<"extend">;
type CommandSummarize = {
  value: type_summarize_item;
} & CommandBase<"summarize">;
type CommandRange = {
  value: { start: number; end: number; step: number } | { start: string; end: number; step: string };
} & CommandBase<"range">;
export type Command =
  | CommandComment
  | CommandHello
  | CommandPing
  | CommandEcho
  | CommandCount
  | CommandLimit
  | CommandCommand
  | CommandOrderBy
  | CommandProject
  | CommandProjectAway
  | CommandScope
  | CommandMvExpand
  | CommandParseJSON
  | CommandParseCSV
  | CommandParseXML
  | CommandParseYAML
  | CommandExtend
  | CommandSummarize
  | CommandRange;
