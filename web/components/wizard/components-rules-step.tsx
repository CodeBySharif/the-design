"use client";

import type { DesignConfig } from "@/lib/schema";

interface ComponentsRulesStepProps {
  config: DesignConfig;
  onChange: (partial: Partial<DesignConfig>) => void;
}

const COMPONENT_GROUPS = [
  {
    title: "Core UI",
    items: [
      ["buttons", "Buttons"],
      ["cards", "Cards"],
      ["inputs", "Inputs"],
      ["badges", "Badges"],
      ["tabs", "Tabs"],
    ],
  },
  {
    title: "Layout sections",
    items: [
      ["heroSection", "Hero section"],
      ["bentoGrid", "Bento grid"],
      ["nav", "Navigation"],
      ["footer", "Footer"],
    ],
  },
  {
    title: "Advanced",
    items: [
      ["modal", "Modal"],
      ["table", "Data table"],
      ["tooltip", "Tooltip"],
      ["avatar", "Avatar"],
      ["pricingCard", "Pricing card"],
    ],
  },
] as const;

export function ComponentsRulesStep({ config, onChange }: ComponentsRulesStepProps) {
  const toggleComponent = (key: keyof DesignConfig["components"]) => {
    onChange({ components: { ...config.components, [key]: !config.components[key] } });
  };

  const updateList = (field: "dos" | "donts", index: number, value: string) => {
    const list = [...config[field]];
    list[index] = value;
    onChange({ [field]: list });
  };

  const addItem = (field: "dos" | "donts") => {
    onChange({ [field]: [...config[field], ""] });
  };

  const removeItem = (field: "dos" | "donts", index: number) => {
    onChange({ [field]: config[field].filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="ds-headline">Components & Rules</h2>
        <p className="ds-body-sm ds-text-muted mt-1">
          Choose which components to document and define design guardrails.
        </p>
      </div>

      {COMPONENT_GROUPS.map((group) => (
        <div key={group.title} className="space-y-3">
          <p className="ds-label">{group.title}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleComponent(key)}
                className={`rounded-lg px-4 py-2 text-sm ${
                  config.components[key] ? "ds-tag-active" : "ds-tag-inactive"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <label className="ds-label">Button style</label>
        <div className="flex gap-2">
          {(["rounded-rect", "pill"] as const).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onChange({ buttonStyle: style })}
              className={`rounded-lg px-4 py-2 text-sm capitalize ${
                config.buttonStyle === style ? "ds-tag-active" : "ds-tag-inactive"
              }`}
            >
              {style.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ListEditor
          title="Do's"
          items={config.dos}
          onChange={(i, v) => updateList("dos", i, v)}
          onAdd={() => addItem("dos")}
          onRemove={(i) => removeItem("dos", i)}
        />
        <ListEditor
          title="Don'ts"
          items={config.donts}
          onChange={(i, v) => updateList("donts", i, v)}
          onAdd={() => addItem("donts")}
          onRemove={(i) => removeItem("donts", i)}
        />
      </div>
    </div>
  );
}

function ListEditor({
  title,
  items,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="ds-label">{title}</p>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
            className="ds-input flex-1 text-sm"
          />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="ds-button-ghost px-2"
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="ds-body-sm text-[var(--color-primary)]">
        + Add item
      </button>
    </div>
  );
}
