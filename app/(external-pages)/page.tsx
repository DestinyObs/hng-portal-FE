import { Button } from '@/components/ui/button';
import React from 'react';

const colors = [
  { name: 'Primary', vars: ['--primary', '--primary-foreground'] },
  { name: 'Secondary', vars: ['--secondary', '--secondary-foreground'] },
  { name: 'Accent', vars: ['--accent', '--accent-foreground'] },
  { name: 'Success', vars: ['--primary-success', '--primary-light-green'] },
  { name: 'Error', vars: ['--primary-error', '--primary-light-red'] },
  { name: 'Muted', vars: ['--muted', '--muted-foreground'] },
  { name: 'Background', vars: ['--background', '--foreground'] },
  { name: 'Card', vars: ['--card', '--card-foreground'] },
  { name: 'Popover', vars: ['--popover', '--popover-foreground'] },
  { name: 'Sidebar', vars: ['--sidebar', '--sidebar-foreground'] },
  { name: 'Charts', vars: ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'] },
];

export default function TestDesignPage() {
  return (
    <div className="p-8 space-y-12">
      {/* Typography Section */}
      <section>
        <h1 className="text-h1 font-bold mb-2">H1 Heading - Bold</h1>
        <h2 className="text-h2 font-semibold mb-2">H2 Heading - SemiBold</h2>
        <h3 className="text-h3 font-medium mb-2">H3 Heading - Medium</h3>
        <h4 className="text-h4 font-normal mb-2">H4 Heading - Normal</h4>
        <h5 className="text-h5 font-light mb-2">H5 Heading - Light</h5>

        <p className="text-body-1 mb-2">Body 1 text - var(--text-fluid-body-1)</p>
        <p className="text-body-2 mb-2">Body 2 text - var(--text-fluid-body-2)</p>
        <p className="text-subtitle mb-2">Subtitle text</p>
        <p className="text-caption mb-2">Caption text</p>
        <p className="text-overline mb-2 uppercase">Overline text</p>
      </section>

      {/* Buttons Section */}
      <section className="space-x-4">
        <h2 className="text-h3 font-bold mb-2">Buttons</h2>
        <Button variant="default">
          Primary
        </Button>
        <Button variant="destructiveOutline">
          Secondary
        </Button>
        <Button variant="outline">
          Outline
        </Button>
      </section>

      {/* Inputs Section */}
      <section className="space-y-2">
        <h2 className="text-h3 font-bold mb-2">Inputs</h2>
        <input
          className="input-field p-2 border border-border rounded w-full"
          placeholder="Text input"
        />
        <input
          className="input-field p-2 border border-border rounded w-full"
          type="password"
          placeholder="Password input"
        />
      </section>

      {/* Links Section */}
      <section>
        <h2 className="text-h3 font-bold mb-2">Links</h2>
        <a href="#" className="text-primary hover:underline">
          Primary Link
        </a>
        <br />
        <a href="#" className="text-secondary hover:underline">
          Secondary Link
        </a>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-h3 font-bold mb-2">Cards</h2>
        <div className="p-4 rounded-lg bg-card text-card-foreground">
          Card Example
        </div>
        <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
          Secondary Card Example
        </div>
      </section>

      {/* Colors Section */}
      <section className="space-y-6">
        <h2 className="text-h3 font-bold mb-4">Colors</h2>
        {colors.map((colorGroup) => (
          <div key={colorGroup.name}>
            <h3 className="font-semibold mb-2">{colorGroup.name}</h3>
            <div className="flex flex-wrap gap-4">
              {colorGroup.vars.map((v) => (
                <div key={v} className="flex flex-col items-center">
                  <div
                    className="w-24 h-16 rounded border border-border"
                    style={{ backgroundColor: `var(${v})` }}
                  ></div>
                  <span className="text-sm mt-1">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
