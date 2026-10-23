import { Building2, MapPin, Phone, Clock, Share2, BarChart3, Globe } from 'lucide-react';
import { useDataFile } from '../hooks/useDataFile.js';
import { DATA_FILES } from '../constants.js';
import { Field, FieldGrid, TextInput, Textarea, NumberInput } from '../components/Fields.jsx';
import SectionCard from '../components/SectionCard.jsx';
import EditorFrame from '../components/EditorFrame.jsx';

/**
 * Sets a dotted path on a draft: set(d, 'social.instagram', v)
 * Safe for single-level keys too, since split('.') yields one part.
 */
function set(draft, path, value) {
    const parts = path.split('.');
    let node = draft;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (typeof node[key] !== 'object' || node[key] === null) node[key] = {};
        node = node[key];
    }
    node[parts[parts.length - 1]] = value;
}

export default function BusinessEditor() {
    const hook = useDataFile(DATA_FILES.business, { commitPrefix: 'Update business info' });

    const setField = (path) => (value) => hook.updateEditData((draft) => set(draft, path, value));

    const d = hook.editData;

    return (
        <EditorFrame sectionId="business" hook={hook}>
            <SectionCard
                icon={Building2}
                title="Identity"
                subtitle="The name and short description used across the header, footer, and page titles."
            >
                <FieldGrid>
                    <Field label="Business name" hint="Full legal or trading name.">
                        <TextInput value={d?.name} onChange={setField('name')} placeholder="Bumper To Bumper" />
                    </Field>
                    <Field label="Short name" hint="Compact form for the nav, alt text, and messages.">
                        <TextInput value={d?.shortName} onChange={setField('shortName')} placeholder="Bumper" />
                    </Field>
                    <Field label="Tagline" span={2} hint="One line describing what the business does.">
                        <TextInput value={d?.tagline} onChange={setField('tagline')} />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={Phone}
                title="Contact"
                subtitle="Phone, email, and address. These appear in the header, footer, contact page, and click-to-call buttons."
            >
                <FieldGrid>
                    <Field label="Phone (display)" hint="Formatted however you want it shown.">
                        <TextInput value={d?.phone} onChange={setField('phone')} type="tel" placeholder="+91 98400 12345" />
                    </Field>
                    <Field label="Second phone" hint="Optional. Shown alongside the first.">
                        <TextInput value={d?.phone2} onChange={setField('phone2')} type="tel" placeholder="+91 87545 85673" />
                    </Field>
                    <Field label="WhatsApp number" span={2} hint="Digits only, with country code. Used to build wa.me links.">
                        <TextInput value={d?.whatsapp} onChange={setField('whatsapp')} inputMode="numeric" placeholder="919840012345" />
                    </Field>
                    <Field label="Email" span={2}>
                        <TextInput value={d?.email} onChange={setField('email')} type="email" placeholder="hello@example.com" />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={MapPin}
                title="Location"
                subtitle="Address, landmark, and map links. The full address feeds the contact page and structured data."
            >
                <FieldGrid>
                    <Field label="Area" hint="Neighbourhood or locality.">
                        <TextInput value={d?.location} onChange={setField('location')} placeholder="Adambakkam" />
                    </Field>
                    <Field label="City">
                        <TextInput value={d?.city} onChange={setField('city')} placeholder="Chennai" />
                    </Field>
                    <Field label="State">
                        <TextInput value={d?.state} onChange={setField('state')} placeholder="Tamil Nadu" />
                    </Field>
                    <Field label="Pincode">
                        <TextInput value={d?.pincode} onChange={setField('pincode')} inputMode="numeric" />
                    </Field>
                    <Field label="Full address" span={2} hint="Shown in the footer and on the contact page.">
                        <Textarea value={d?.address} onChange={setField('address')} rows={2} />
                    </Field>
                    <Field
                        label="Street address"
                        span={2}
                        hint="Street line only, without city or pincode. Used for structured data so search engines read it correctly."
                    >
                        <Textarea value={d?.street} onChange={setField('street')} rows={2} />
                    </Field>
                    <Field label="Landmark" span={2} hint="A short nearby reference, e.g. a mall or junction.">
                        <TextInput value={d?.landmark} onChange={setField('landmark')} />
                    </Field>
                    <Field label="Google Maps link" span={2} hint="The shareable link to your listing.">
                        <TextInput value={d?.googleMapsUrl} onChange={setField('googleMapsUrl')} placeholder="https://maps.app.goo.gl/…" />
                    </Field>
                    <Field
                        label="Map embed URL"
                        span={2}
                        hint="From Google Maps: Share → Embed a map → copy just the src value."
                    >
                        <TextInput value={d?.mapUrl} onChange={setField('mapUrl')} placeholder="https://www.google.com/maps/embed?pb=…" />
                    </Field>
                    <Field label="Google Reviews link" span={2}>
                        <TextInput value={d?.googleReviewsUrl} onChange={setField('googleReviewsUrl')} />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={Clock}
                title="Opening hours"
                subtitle="Shown on the contact page and in footer microdata."
            >
                <FieldGrid>
                    <Field label="Weekdays — label">
                        <TextInput value={d?.hours?.weekdays?.days} onChange={setField('hours.weekdays.days')} placeholder="Mon – Sat" />
                    </Field>
                    <Field label="Weekdays — hours">
                        <TextInput value={d?.hours?.weekdays?.open} onChange={setField('hours.weekdays.open')} placeholder="10:00 AM – 8:00 PM" />
                    </Field>
                    <Field label="Sunday — label">
                        <TextInput value={d?.hours?.sunday?.days} onChange={setField('hours.sunday.days')} placeholder="Sunday" />
                    </Field>
                    <Field label="Sunday — hours">
                        <TextInput value={d?.hours?.sunday?.open} onChange={setField('hours.sunday.open')} placeholder="10:00 AM – 5:00 PM" />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={Share2}
                title="Social profiles"
                subtitle="Links to your profiles. Leave a field blank to hide that icon everywhere on the site."
            >
                <FieldGrid>
                    <Field label="Instagram">
                        <TextInput value={d?.social?.instagram} onChange={setField('social.instagram')} placeholder="https://instagram.com/…" />
                    </Field>
                    <Field label="Instagram handle" hint="Shown as @handle beside the icon.">
                        <TextInput value={d?.instagramHandle} onChange={setField('instagramHandle')} placeholder="@bumpertobumper" />
                    </Field>
                    <Field label="Facebook">
                        <TextInput value={d?.social?.facebook} onChange={setField('social.facebook')} placeholder="https://facebook.com/…" />
                    </Field>
                    <Field label="YouTube">
                        <TextInput value={d?.social?.youtube} onChange={setField('social.youtube')} placeholder="https://youtube.com/…" />
                    </Field>
                    <Field label="Twitter / X">
                        <TextInput value={d?.social?.twitter} onChange={setField('social.twitter')} placeholder="https://x.com/…" />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={BarChart3}
                title="Statistics"
                subtitle="The counters on the homepage. Labels sit next to the numbers, so keep them short."
            >
                <FieldGrid>
                    <Field label="Years of experience">
                        <NumberInput value={d?.stats?.yearsExperience} onChange={setField('stats.yearsExperience')} min={0} />
                    </Field>
                    <Field label="Clients served">
                        <NumberInput value={d?.stats?.clientsServed} onChange={setField('stats.clientsServed')} min={0} />
                    </Field>
                    <Field label="Accessory categories">
                        <NumberInput value={d?.stats?.accessoryCategories} onChange={setField('stats.accessoryCategories')} min={0} />
                    </Field>
                    <div className="edit-field--span-full" />
                    <Field label="Years label" hint="Text shown under the years number.">
                        <TextInput value={d?.stats?.labels?.yearsExperience} onChange={setField('stats.labels.yearsExperience')} />
                    </Field>
                    <Field label="Clients label">
                        <TextInput value={d?.stats?.labels?.clientsServed} onChange={setField('stats.labels.clientsServed')} />
                    </Field>
                    <Field label="Categories label">
                        <TextInput value={d?.stats?.labels?.accessoryCategories} onChange={setField('stats.labels.accessoryCategories')} />
                    </Field>
                </FieldGrid>
            </SectionCard>

            <SectionCard
                icon={Globe}
                title="Site settings"
                subtitle="Used for canonical URLs and structured data. Changing the site URL affects search indexing, so change it only if the domain changed."
            >
                <FieldGrid>
                    <Field label="Site name">
                        <TextInput value={d?.siteName} onChange={setField('siteName')} />
                    </Field>
                    <Field label="Site URL">
                        <TextInput value={d?.siteUrl} onChange={setField('siteUrl')} placeholder="https://example.com" />
                    </Field>
                    <Field label="Latitude" hint="Used for local business structured data.">
                        <NumberInput value={d?.geo?.latitude} onChange={setField('geo.latitude')} step="any" />
                    </Field>
                    <Field label="Longitude">
                        <NumberInput value={d?.geo?.longitude} onChange={setField('geo.longitude')} step="any" />
                    </Field>
                </FieldGrid>
            </SectionCard>
        </EditorFrame>
    );
}