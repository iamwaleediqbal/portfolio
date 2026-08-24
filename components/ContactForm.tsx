"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type State = "idle" | "sending" | "sent" | "error";

/**
 * Posts to Web3Forms. No backend of my own, no database, no mail server — and
 * critically, no email address sitting in the page source for scrapers.
 *
 * Without a key configured the form does not pretend to work: it says so and
 * falls back to a plain address, which is better than swallowing someone's
 * message.
 */
export function ContactForm({
  accessKey,
  fallbackEmail,
}: {
  accessKey?: string;
  fallbackEmail: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  if (!accessKey) {
    return (
      <Alert>
        <AlertDescription>
          The form is not configured on this deployment. Email me directly at{" "}
          <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>
          .
        </AlertDescription>
      </Alert>
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "the message was not accepted");
      }
      setState("sent");
      form.reset();
    } catch (caught) {
      setState("error");
      setError(caught instanceof Error ? caught.message : String(caught));
    }
  }

  if (state === "sent") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-chart-2/35 bg-chart-2/10 p-5">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-chart-2" aria-hidden />
        <div>
          <h3 className="font-semibold tracking-tight">Message sent</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            I read everything and usually reply within a day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={submit}>
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="New message from your portfolio" />
      {/* Honeypot: bots fill it, people never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] size-0 opacity-0"
      />

      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What are you building, and where are you stuck?"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </Button>
        <span className="text-sm text-muted-foreground">
          or email{" "}
          <a
            className="text-foreground underline underline-offset-4"
            href={`mailto:${fallbackEmail}`}
          >
            {fallbackEmail}
          </a>
        </span>
      </div>

      {state === "error" && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>
            That did not go through: {error}. You can email me directly instead.
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
