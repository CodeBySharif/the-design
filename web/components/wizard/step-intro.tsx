interface StepIntroProps {
  overline: string;
  title: string;
  description: string;
}

/** Full-width step header: title left, supporting copy right. */
export function StepIntro({ overline, title, description }: StepIntroProps) {
  return (
    <header className="ds-step-intro">
      <div className="ds-step-intro-lead">
        <p className="ds-overline">{overline}</p>
        <h2 className="ds-headline mt-1">{title}</h2>
      </div>
      <p className="ds-step-intro-copy ds-body-sm ds-text-muted">{description}</p>
    </header>
  );
}
