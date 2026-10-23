import { Palette, Type, LayoutTemplate, Info } from 'lucide-react';
import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, FieldGrid, TextInput, Textarea } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';

/** "professionalInstallation" → "Professional installation" */
function humanize(key) {
    const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').toLowerCase();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function ThemeEditor() {
    const hook = useDataFile(DATA_FILES.theme, { commitPrefix: 'Update theme reference' });
    const d = hook.editData;

    const set = (path) => (value) =>
        hook.updateEditData((draft) => {
            const parts = path.split('.');
            let node = draft;
            for (let i = 0; i < parts.length - 1; i++) {
                if (typeof node[parts[i]] !== 'object' || node[parts[i]] === null) node[parts[i]] = {};
                node = node[parts[i]];
            }
            node[parts[parts.length - 1]] = value;
        });

    return (
        <EditorFrame
            sectionId="theme"
            hook={hook}
            notice={{
                icon: Info,
                text: 'This file documents the design system for whoever works on the code next. Actual colours and fonts are defined in the CSS token files, not here — changing this file will not restyle the site.',
            }}
        >
            <SectionCard icon={Palette} title="Theme" subtitle="Name and version of the design system.">
                <FieldGrid>
                    <Field label="Theme name">
                        <TextInput value={d?.name} onChange={set('name')} />
                    </Field>
                    <Field label="Version">
                        <TextInput value={d?.version} onChange={set('version')} />
                    </Field>
                    <Field label="Description" span={2}>
                        <Textarea value={d?.description} onChange={set('description')} rows={3} />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={Palette}
                title="Brand"
                subtitle="Brand identity notes. The live business name and tagline are managed under Business."
            >
                <FieldGrid>
                    <Field label="Accent colour" hint="Hex value, for reference only.">
                        <TextInput value={d?.brand?.accentColor} onChange={set('brand.accentColor')} />
                    </Field>
                    <Field label="Accent meaning" hint="What the accent colour signals.">
                        <Textarea value={d?.brand?.accentMeaning} onChange={set('brand.accentMeaning')} rows={2} />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard icon={Type} title="Typography" subtitle="The typeface pairing and why it was chosen.">
                <FieldGrid>
                    <Field label="Font family" span={2}>
                        <TextInput value={d?.typography?.family} onChange={set('typography.family')} />
                    </Field>
                    <Field label="Rationale" span={2} hint="Why this pairing suits the brand.">
                        <Textarea value={d?.typography?.rationale} onChange={set('typography.rationale')} rows={3} />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={LayoutTemplate}
                title="UI principles"
                subtitle="The rules whoever builds new interfaces here should follow."
            >
                <FieldGrid>
                    {Object.entries(d?.uiPrinciples || {}).map(([key, value]) => (
                        <Field key={key} label={humanize(key)} span={2}>
                            <TextInput value={value} onChange={set(`uiPrinciples.${key}`)} />
                        </Field>
                    ))}
                </FieldGrid>
            </SectionCard>
        </EditorFrame>
    );
}