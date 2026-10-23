import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, TextInput, Textarea, NumberInput, ImageField } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import ActionBar from '../components/ActionBar.jsx';

export default function BusinessEditor() {
    const hook = useDataFile(DATA_FILES.business, { commitPrefix: 'Update' });

    function updateField(field, value) {
        hook.updateEditData((draft) => {
            draft[field] = value;
        });
    }

    function updateNested(parent, field, value) {
        hook.updateEditData((draft) => {
            if (!draft[parent]) draft[parent] = {};
            draft[parent][field] = value;
        });
    }

    function updateNestedNested(grandparent, parent, field, value) {
        hook.updateEditData((draft) => {
            if (!draft[grandparent]) draft[grandparent] = {};
            if (!draft[grandparent][parent]) draft[grandparent][parent] = {};
            draft[grandparent][parent][field] = value;
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

            <SectionCard title="Basic Info" subtitle="Name, tagline, and location">
                <Field label="Name">
                    <TextInput value={hook.editData?.name} onChange={(v) => updateField('name', v)} />
                </Field>
                <Field label="Short name" hint="Compact brand name used in nav, alt text, and WhatsApp messages">
                    <TextInput value={hook.editData?.shortName} onChange={(v) => updateField('shortName', v)} />
                </Field>
                <Field label="Tagline">
                    <TextInput value={hook.editData?.tagline} onChange={(v) => updateField('tagline', v)} />
                </Field>
                <Field label="Location" hint="Area and city, e.g. Adambakkam, Chennai">
                    <TextInput value={hook.editData?.location} onChange={(v) => updateField('location', v)} />
                </Field>
                <Field label="City">
                    <TextInput value={hook.editData?.city} onChange={(v) => updateField('city', v)} />
                </Field>
                <Field label="State">
                    <TextInput value={hook.editData?.state} onChange={(v) => updateField('state', v)} />
                </Field>
            </SectionCard>

            <SectionCard title="Contact" subtitle="Phone, WhatsApp, email, and address">
                <Field label="Phone (display)">
                    <TextInput value={hook.editData?.phone} onChange={(v) => updateField('phone', v)} placeholder="+91 98400 12345" />
                </Field>
                <Field label="Phone 2 (display)" hint="Second phone number shown on site">
                    <TextInput value={hook.editData?.phone2} onChange={(v) => updateField('phone2', v)} placeholder="+91 87545 85673" />
                </Field>
                <Field label="WhatsApp (digits only)" hint="Used in wa.me links">
                    <TextInput value={hook.editData?.whatsapp} onChange={(v) => updateField('whatsapp', v)} placeholder="919840012345" />
                </Field>
                <Field label="Email">
                    <TextInput value={hook.editData?.email} onChange={(v) => updateField('email', v)} type="email" />
                </Field>
                <Field label="Full Address" hint="Shown in footer and contact page">
                    <Textarea value={hook.editData?.address} onChange={(v) => updateField('address', v)} rows={2} />
                </Field>
                <Field label="Street address" hint="Used in schema.org structured data">
                    <Textarea value={hook.editData?.street} onChange={(v) => updateField('street', v)} rows={2} />
                </Field>
                <Field label="Landmark" hint="Short location line, e.g. The ARK, Jawaharlal Nehru Salai">
                    <TextInput value={hook.editData?.landmark} onChange={(v) => updateField('landmark', v)} />
                </Field>
                <Field label="Pincode">
                    <TextInput value={hook.editData?.pincode} onChange={(v) => updateField('pincode', v)} />
                </Field>
                <Field label="Google Maps Embed URL">
                    <TextInput value={hook.editData?.mapUrl} onChange={(v) => updateField('mapUrl', v)} />
                </Field>
                <Field label="Google Maps Link">
                    <TextInput value={hook.editData?.googleMapsUrl} onChange={(v) => updateField('googleMapsUrl', v)} />
                </Field>
                <Field label="Google Reviews Link">
                    <TextInput value={hook.editData?.googleReviewsUrl} onChange={(v) => updateField('googleReviewsUrl', v)} />
                </Field>
            </SectionCard>

            <SectionCard title="Hours" subtitle="Opening and closing times">
                <Field label="Weekdays label">
                    <TextInput
                        value={hook.editData?.hours?.weekdays?.days}
                        onChange={(v) => updateNestedNested('hours', 'weekdays', 'days', v)}
                    />
                </Field>
                <Field label="Weekdays open">
                    <TextInput
                        value={hook.editData?.hours?.weekdays?.open}
                        onChange={(v) => updateNestedNested('hours', 'weekdays', 'open', v)}
                    />
                </Field>
                <Field label="Weekdays close">
                    <TextInput
                        value={hook.editData?.hours?.weekdays?.close}
                        onChange={(v) => updateNestedNested('hours', 'weekdays', 'close', v)}
                    />
                </Field>
                <Field label="Sunday label">
                    <TextInput
                        value={hook.editData?.hours?.sunday?.days}
                        onChange={(v) => updateNestedNested('hours', 'sunday', 'days', v)}
                    />
                </Field>
                <Field label="Sunday open">
                    <TextInput
                        value={hook.editData?.hours?.sunday?.open}
                        onChange={(v) => updateNestedNested('hours', 'sunday', 'open', v)}
                    />
                </Field>
                <Field label="Sunday close">
                    <TextInput
                        value={hook.editData?.hours?.sunday?.close}
                        onChange={(v) => updateNestedNested('hours', 'sunday', 'close', v)}
                    />
                </Field>
            </SectionCard>

            <SectionCard title="Social" subtitle="Social media profile links">
                <Field label="Instagram URL">
                    <TextInput value={hook.editData?.social?.instagram} onChange={(v) => updateNested('social', 'instagram', v)} />
                </Field>
                <Field label="Facebook URL">
                    <TextInput value={hook.editData?.social?.facebook} onChange={(v) => updateNested('social', 'facebook', v)} />
                </Field>
                <Field label="YouTube URL">
                    <TextInput value={hook.editData?.social?.youtube} onChange={(v) => updateNested('social', 'youtube', v)} />
                </Field>
                <Field label="Twitter URL">
                    <TextInput value={hook.editData?.social?.twitter} onChange={(v) => updateNested('social', 'twitter', v)} />
                </Field>
                <Field label="Instagram handle (display)">
                    <TextInput value={hook.editData?.instagramHandle} onChange={(v) => updateField('instagramHandle', v)} />
                </Field>
            </SectionCard>

            <SectionCard title="Stats" subtitle="Numbers shown on the homepage">
                <Field label="Years of Experience">
                    <NumberInput value={hook.editData?.stats?.yearsExperience} onChange={(v) => updateNested('stats', 'yearsExperience', v)} />
                </Field>
                <Field label="Clients Served">
                    <NumberInput value={hook.editData?.stats?.clientsServed} onChange={(v) => updateNested('stats', 'clientsServed', v)} />
                </Field>
                <Field label="Accessory Categories">
                    <NumberInput value={hook.editData?.stats?.accessoryCategories} onChange={(v) => updateNested('stats', 'accessoryCategories', v)} />
                </Field>
                <Field label="Years label">
                    <TextInput value={hook.editData?.stats?.labels?.yearsExperience} onChange={(v) => updateNestedNested('stats', 'labels', 'yearsExperience', v)} />
                </Field>
                <Field label="Clients label">
                    <TextInput value={hook.editData?.stats?.labels?.clientsServed} onChange={(v) => updateNestedNested('stats', 'labels', 'clientsServed', v)} />
                </Field>
                <Field label="Categories label">
                    <TextInput value={hook.editData?.stats?.labels?.accessoryCategories} onChange={(v) => updateNestedNested('stats', 'labels', 'accessoryCategories', v)} />
                </Field>
            </SectionCard>

            <SectionCard title="Site Settings" subtitle="URL, site name, and geo coordinates">
                <Field label="Site URL" hint="Used in schema.org markup">
                    <TextInput value={hook.editData?.siteUrl} onChange={(v) => updateField('siteUrl', v)} />
                </Field>
                <Field label="Site Name">
                    <TextInput value={hook.editData?.siteName} onChange={(v) => updateField('siteName', v)} />
                </Field>
                <Field label="Latitude" hint="Used in schema.org geo coordinates">
                    <NumberInput value={hook.editData?.geo?.latitude} onChange={(v) => updateNested('geo', 'latitude', v)} step="any" />
                </Field>
                <Field label="Longitude" hint="Used in schema.org geo coordinates">
                    <NumberInput value={hook.editData?.geo?.longitude} onChange={(v) => updateNested('geo', 'longitude', v)} step="any" />
                </Field>
            </SectionCard>
        </div>
    );
}
