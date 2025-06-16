import React from "react";
import { Input, Button, Checkbox } from "@material-tailwind/react";
const CuratorNote = () => {
  return (
    <div className="m-10">
      <div className="text-2xl py-2">Curator Notes</div>
      <div className="pt-3 pb-8">
        Artkya curators and art advisors are often approached for special
        collections or projects that require artists to have a unique skill set
        or history in a specific practice area. By entering the information
        below, you are making it possible for curators to better identify you
        for these projects. Please note, we value your privacy. View Saatchi
        Art's privacy policy.
      </div>
      {/* Social Links  */}
      <div>
        <div className="py-2 text-xl border-b-2">Social Links</div>
        <div className="pt-3">
          Provide us with your social links. We'll use this information in our
          promotional marketing efforts.
        </div>
        <div className="space-y-6 py-10">
          <InputSocialLinks label={"Facebook"} />
          <InputSocialLinks label={"Twitter"} />
          <InputSocialLinks label={"Pinterest"} />
          <InputSocialLinks label={"TikTok"} />
          <InputSocialLinks label={"Instagram"} />
          <InputSocialLinks label={"Website"} />
        </div>
      </div>
      {/* Commissions */}
      <div>
        <div className="py-2 text-xl border-b-2">Social Links</div>
        <div className="py-3 text-xl">
          <FirstSubFields
            label={"Are you willing to do commissions for private clients?"}
          />
          <FirstSubFields
            label={
              "Are you willing to do commissions for hotels and corporate customers?"
            }
          />
        </div>
      </div>
      {/* Murals and Public Art */}
      <div className="py-3 text-xl">
        <div className="py-2 text-xl border-b-2">Murals and Public Art</div>
        <div className="py-3 text-xl">
          <FirstSubFields
            label={"As part of your practice, do you make murals?"}
          />
          <FirstSubFields
            label={
              "If yes, do you have 2 or more years experience creating murals?"
            }
          />
        </div>
      </div>
      {/*  Custom Prints ( Photographers/Printmakers )*/}
      <div className="py-3 text-xl">
        <div className="py-2 text-xl border-b-2">
          Custom Prints ( Photographers/Printmakers )
        </div>
        <div className="py-3 text-xl">
          <SecSubFields
            label={"Are you open to producing prints at custom dimensions?"}
          />
          <SecSubFields
            label={
              "Are you able to print custom works at oversized dimensions (60+ inches)?"
            }
          />
          <SecSubFields
            label={"Are you able to offer custom framing or mounted works?"}
          />
        </div>
      </div>
      {/*  Work for Hotels and Hospitality Partners*/}
      <div className="py-3 text-xl">
        <div className="py-2 text-xl border-b-2">
          Work for Hotels and Hospitality Partners
        </div>
        <div className="py-3 text-xl">
          <FirstSubFields
            label={
              "Are you willing to allow print reproductions of your work specifically for hotel projects?"
            }
          />
          <FirstSubFields
            label={
              "Are you willing to negotiate a royalty payment for use of digital files of your work for hotel projects? (Contracts would be issued for specific, agreed usage of files and Saatchi Art would produce prints.)"
            }
          />
          <FirstSubFields
            label={"Are you able to offer custom framing or mounted works?"}
          />
        </div>
      </div>
      {/*  Causes and Charities*/}
      <div className="py-3 text-xl">
        <div className="py-2 text-xl border-b-2">Causes and Charities</div>
        <div className="py-3 text-xl">
          <FirstSubFields
            label={
              "Are you open to offering your work as a part of a charity sale, with some portion of your proceeds going to the fundraising organization?"
            }
          />
          <FirstSubFields
            label={
              "Are there particular charities or causes that you personally support that you would like to let us know about? Please list them below."
            }
          />
        </div>
      </div>
      {/*  Identity*/}
      <div className="py-3 text-xl">
        <div className="py-2 text-xl border-b-2">Identity</div>
        <div>
          <div className="py-2 text-xl">
            How would you describe your gender?
          </div>
          <div className="flex flex-col">
            <Checkbox label="Female" />
            <Checkbox label="Male" />
            <Checkbox label="Non-binary/third gender" />
            <Checkbox label="Prefer not to say" />
            <Checkbox label="Prefer to self-describe" />
          </div>
        </div>
        <div>
          <div className="py-2 text-xl">
            How do you identify your ethnicity? (select all that apply)
          </div>
          <div className="flex flex-col">
            <Checkbox label="Asian" />
            <Checkbox label="Black/African" />
            <Checkbox label="Caucasian" />
            <Checkbox label="Hispanic/Latinx" />
            <Checkbox label="Native American" />
            <Checkbox label="Pacific Islander" />
            <Checkbox label="Prefer not to answer" />
            <Checkbox label="Prefer to self-describe:" />
          </div>
        </div>
      </div>
      {/*  Artwork Themes*/}
      <div className="py-3 text-xl">
        <div className="py-2 text-xl border-b-2">Artwork Themes</div>
        <div>
          <div className="py-2 text-xl">
            Does your artistic practice regularly engage with any of the
            following themes or issues? Select all that apply.
          </div>
          <div className="flex flex-col">
            <Checkbox label="Accessibility and advocacy for persons with disabilities" />
            <Checkbox label="Animal Rights and Protections" />
            <Checkbox label="Black Identity, Culture, and Activism" />
            <Checkbox label="Body Image and Self Esteem" />
            <Checkbox label="Conflict and Adversity" />
            <Checkbox label="Cultural Diversity" />
            <Checkbox label="Environmentalism, Sustainability, and Climate Issues" />
            <Checkbox label="Freedom and Social Change" />
            <Checkbox label="Health and Wellness" />
            <Checkbox label="Historical Subjects" />
            <Checkbox label="Heroes and Leaders" />
            <Checkbox label="Identity" />
            <Checkbox label="Immigration and Migration" />
            <Checkbox label="Indigenous identity, culture, and activism" />
            <Checkbox label="Latinx" />
            <Checkbox label="LGBTQIA+" />
            <Checkbox label="Masculinity" />
            <Checkbox label="Mental Health" />
            <Checkbox label="Politics and Activism" />
            <Checkbox label="Refugee Advocacy" />
            <Checkbox label="Spirituality and Meditation" />
            <Checkbox label="Women's Issues" />
          </div>
        </div>
      </div>
      <div className="py-8 pl-10">
        <Button className="px-14 text-sm">Save Changes</Button>
      </div>
    </div>
  );
};

export default CuratorNote;

export const InputSocialLinks = ({ label }) => {
  return (
    <>
      <div className="flex items-center">
        <div className="w-[10%] font-semibold text-lg">{label}</div>
        <div className="w-1/2">
          <Input label={`${label}`} />
        </div>
      </div>
    </>
  );
};

export const FirstSubFields = ({
  label,
  yesOnChange,
  NoOnChange,
  labelchecked,
}) => {
  return (
    <>
      <div>{label}</div>
      <div className="flex">
        <Checkbox label="Yes" onChange={yesOnChange} checked={labelchecked} />
        <Checkbox label="No" onChange={NoOnChange} checked={labelchecked} />
      </div>
    </>
  );
};

export const SecSubFields = ({
  label,
  yesOnChange,
  NoOnChange,
  NAOnChange,
  labelchecked,
}) => {
  return (
    <>
      <div>{label}</div>
      <div className="flex">
        <Checkbox label="Yes" onChange={yesOnChange} checked={labelchecked} />
        <Checkbox label="No" onChange={NoOnChange} checked={labelchecked} />
        <Checkbox label="N/A" onChange={NAOnChange} checked={labelchecked} />
      </div>
    </>
  );
};
