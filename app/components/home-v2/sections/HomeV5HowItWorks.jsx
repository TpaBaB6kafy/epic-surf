import EditablePhoto from "./EditablePhoto";
import "./home-v5-how.css";

const root = "/design/home-v5/how-it-works";
const photos = ["meet-photo.webp", "theory-photo.webp", "practice-photo.webp", "review-tips-camera.webp"];

export default function HomeV5HowItWorks({ steps, title, titleEnd, lang }) {
  return (
    <div data-home-v5-how data-lang={lang}>
      <h2 data-home-v5-how-heading>
        <span>{title}</span> <span>{titleEnd}</span>
      </h2>
      {steps.map((step, index) => (
        <article data-home-v5-how-card={index + 1} key={step.title}>
          <div className="home-v5-how-media">
            <EditablePhoto data-home-v5-photo slot={`how-${index + 1}`}
              label={`Как это работает: ${step.title}`} src={`${root}/${photos[index]}`} alt={step.title}
              sizes="(max-width: 699px) 40vw, (max-width: 999px) 38vw, 20vw" unoptimized />
            <h3 data-home-v5-card-title>{step.title}</h3>
          </div>
          <p data-home-v5-card-copy>{step.desc}</p>
        </article>
      ))}
    </div>
  );
}
