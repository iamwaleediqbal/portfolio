import data from "../data/leaderboard.json";

interface Row {
  model: string;
  pass_rate: number;
  ci_low: number;
  ci_high: number;
  rank: number;
  tied: boolean;
  dropped_attempts: number;
}

export function Leaderboard() {
  const report = data as unknown as {
    generated_at: string;
    repeats: number;
    task_count: number;
    models: Row[];
    sample?: boolean;
  };

  return (
    <>
      {report.sample && (
        <p className="sample">
          Sample data, shown so this section is not empty. It is replaced by the
          first real nightly run.
        </p>
      )}
      <div className="scroller">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Model</th>
              <th>Pass rate</th>
              <th>95% CI</th>
              <th>Dropped</th>
            </tr>
          </thead>
          <tbody>
            {report.models.map((row) => (
              <tr key={row.model}>
                <td>
                  {row.rank}
                  {row.tied ? "=" : ""}
                </td>
                <td className="model">{row.model.replace(":free", "")}</td>
                <td>
                  <div className="bar">
                    <i style={{ width: `${Math.max(2, row.pass_rate * 100)}%` }} />
                  </div>
                  {Math.round(row.pass_rate * 100)}%
                </td>
                <td>
                  {Math.round(row.ci_low * 100)}-{Math.round(row.ci_high * 100)}%
                </td>
                <td>{row.dropped_attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note">
        {report.task_count} tasks, {report.repeats} attempts each. Models sharing
        a rank have overlapping intervals, which means the data cannot order
        them. Dropped attempts never reached a model and are excluded rather
        than scored zero.
      </p>
    </>
  );
}
