import Typography from "../../UI/typography/typography";

const formStep2 = [
  "Below is a template based on your selected format (HTML, JSON, or YAML)",

  "Placeholders like {fileName} and {imageAlt} will be automatically replaced for each uploaded file",

  "You can freely edit, delete, or wrap anything inside the editor — it’s completely up to you",

  "When you're done, we’ll loop through your files and generate final code using this template",
];

export default function UsageGuidelines() {
  return (
    <div>
      <ul>
        {formStep2.map((s) => (
          <li>
            {" "}
            <Typography body color="black">
              {s} <br />
            </Typography>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
