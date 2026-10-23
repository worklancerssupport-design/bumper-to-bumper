import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Textarea } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ActionBar from '../components/ActionBar.jsx';

export default function ThemeEditor() {
    const hook = useDataFile(DATA_FILES.theme, { commitPrefix: 'Update' });

    function updateField(field, value) {
        hook.updateEditData((draft) => {
            draft[field] = value;
        });
    }

    return (
        <div>
            <ActionBar
                loading={hook.loading}
                saving={hook.saving}
                error={hook.error}
                hasChanges={hook.hasChanges}
                onRefresh={hook.refresh}
                onDiscard={hook.discard}
                onSave={() => hook.save()}
            />

            <SectionCard title="Theme Reference" subtitle="Documentation of all colors and typography. Actual CSS variables live in /src/styles/colorConfig.css — edit colors there, not here.">
                <Field label="Theme name">
                    <TextInput value={hook.editData?.name} onChange={(v) => updateField('name', v)} />
                </Field>
                <Field label="Version">
                    <TextInput value={hook.editData?.version} onChange={(v) => updateField('version', v)} />
                </Field>
                <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Description">
                        <Textarea value={hook.editData?.description} onChange={(v) => updateField('description', v)} rows={2} />
                    </Field>
                </div>
            </SectionCard>

            <SectionCard title="Brand" subtitle="Brand identity settings">
                <Field label="Brand name">
                    <TextInput value={hook.editData?.brand?.name} onChange={(v) => hook.updateEditData((d) => { d.brand.name = v; })} />
                </Field>
                <Field label="Tagline">
                    <TextInput value={hook.editData?.brand?.tagline} onChange={(v) => hook.updateEditData((d) => { d.brand.tagline = v; })} />
                </Field>
                <Field label="Accent color" hint="Hex value (e.g. #e63946)">
                    <TextInput value={hook.editData?.brand?.accentColor} onChange={(v) => hook.updateEditData((d) => { d.brand.accentColor = v; })} />
                </Field>
                <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Accent meaning">
                        <Textarea value={hook.editData?.brand?.accentMeaning} onChange={(v) => hook.updateEditData((d) => { d.brand.accentMeaning = v; })} rows={2} />
                    </Field>
                </div>
            </SectionCard>

            <SectionCard title="Typography" subtitle="Font settings">
                <Field label="Font family">
                    <TextInput value={hook.editData?.typography?.family} onChange={(v) => hook.updateEditData((d) => { d.typography.family = v; })} />
                </Field>
                <div style={{ gridColumn: 'span 2' }}>
                    <Field label="Rationale">
                        <Textarea value={hook.editData?.typography?.rationale} onChange={(v) => hook.updateEditData((d) => { d.typography.rationale = v; })} rows={3} />
                    </Field>
                </div>
            </SectionCard>

            <SectionCard title="UI Principles" subtitle="Design philosophy guidelines">
                <div style={{ gridColumn: 'span 2' }}>
                    {hook.editData?.uiPrinciples && Object.entries(hook.editData.uiPrinciples).map(([key, value]) => (
                        <Field key={key} label={key}>
                            <TextInput value={value} onChange={(v) => hook.updateEditData((d) => { d.uiPrinciples[key] = v; })} />
                        </Field>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
