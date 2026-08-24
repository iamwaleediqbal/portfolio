import { Leaderboard } from "../components/Leaderboard.tsx";
import { experience, profile, projects } from "../content/site.ts";

export default function Home() {
  return (
    <main className="wrap">
      <header className="hero">
        <h1>{profile.name}</h1>
        <p className="role">
          {profile.role} &middot; {profile.focus} &middot; {profile.location}
        </p>
        {profile.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <nav className="links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href="#work">Work</a>
        </nav>
      </header>

      <section id="work">
        <h2>Projects</h2>
        {projects.map((project) => (
          <article className="project" key={project.slug}>
            <div className="project-head">
              <h3>{project.name}</h3>
              <span className="badge">{project.status}</span>
            </div>
            <p className="tagline">{project.tagline}</p>
            <p>{project.what}</p>
            <p>{project.why}</p>
            <ul>
              {project.highlights.map((line) => (
                <li key={line.slice(0, 24)}>{line}</li>
              ))}
            </ul>
            <div className="stack">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {(project.repo || project.live) && (
              <div className="project-links">
                {project.live && <a href={project.live}>Try it</a>}
                {project.repo && <a href={project.repo}>Source</a>}
              </div>
            )}
          </article>
        ))}
      </section>

      <section id="leaderboard">
        <h2>Free model leaderboard</h2>
        <p>
          Produced by <strong>agentscore</strong>, run nightly in GitHub Actions
          against OpenRouter&apos;s free tier. It costs nothing to operate, which
          is the point: the models here are the ones a project with no budget
          can actually use.
        </p>
        <Leaderboard />
      </section>

      <section id="experience">
        <h2>Experience</h2>
        {experience.map((job) => (
          <div className="job" key={job.company}>
            <div className="job-head">
              <h3>
                {job.role}, {job.company}
              </h3>
              <span className="period">{job.period}</span>
            </div>
            <ul>
              {job.lines.map((line) => (
                <li key={line.slice(0, 24)}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer>
        <p>
          Everything above that is open source is small enough to read in one
          sitting, and the tests are written against the mistakes rather than
          the happy path. That is deliberate. Anyone can publish a repository
          that works on the example in the README.
        </p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </footer>
    </main>
  );
}
