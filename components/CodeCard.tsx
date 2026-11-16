/**
 * polyact has no screen to photograph, so its picture is the code that shows
 * the whole problem: two providers, two different numbers, one click. This is
 * the example from its README, which runs as written.
 *
 * Coloured by a tiny tokenizer on the server, so nothing ships to the client.
 */
const CODE = `from polyact import Screen, parse_anthropic, parse_gemini

screen = Screen(1920, 1080)

anthropic = {"content": [{"type": "tool_use", "id": "t1", "name": "computer",
                          "input": {"action": "left_click", "coordinate": [960, 540]}}]}
gemini = {"candidates": [{"content": {"parts": [{"functionCall": {
             "name": "click_at", "args": {"x": 500, "y": 500}}}]}}]}

parse_anthropic(anthropic, screen)[0].point   # (960, 540)
parse_gemini(gemini, screen)[0].point         # (960, 540)`;

const TOKEN = /(#.*$)|("[^"]*")|\b(from|import)\b|\b(\d+)\b/gm;

function colour(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(line.slice(last, index));
    const [text, comment, string, keyword] = match;
    const cls = comment ? "text-[#8a8aa3]" : string ? "text-[#9be38f]" : keyword ? "text-[#ff7ab6]" : "text-[#ffc83d]";
    out.push(
      <span key={index} className={cls}>
        {text}
      </span>,
    );
    last = index + text.length;
  }
  out.push(line.slice(last));
  return out;
}

export function CodeCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e15] text-[#e8e6f0] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.7)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-tangerine/80" />
          <span className="size-2.5 rounded-full bg-sun/80" />
          <span className="size-2.5 rounded-full bg-mint/80" />
        </span>
        <span className="mx-auto font-mono text-[11px] text-white/50">from the polyact README</span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.75] sm:p-6 sm:text-[13px]">
        <code>
          {CODE.split("\n").map((line, index) => (
            <span key={index} className="block min-h-[1.75em]">
              {colour(line)}
            </span>
          ))}
        </code>
      </pre>
      <p className="border-t border-white/10 px-5 py-3 font-mono text-[11.5px] text-white/60 sm:px-6">
        Different numbers. The same click. Only one of them says so.
      </p>
    </div>
  );
}
