
export function formatIssuesForReview(issues: any[]) {
    return issues.map((issue) => {
      const key = issue.key;
      const summary = issue.fields?.summary;
      const assignee = issue.fields?.assignee?.displayName ?? "未アサイン";
      const status = issue.fields?.status?.statusCategory?.name ?? "不明";
  
      return `・${key}: ${summary} (担当: ${assignee}, ステータス: ${status})`;
    }).join("\n");
  }
  