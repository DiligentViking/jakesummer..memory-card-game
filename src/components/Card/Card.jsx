import "./Card.css";

export default function Card({ imgUrl, title, handleClick }) {
  return (
    <button className="card" onClick={handleClick}>
      <img src={imgUrl} alt="" />
      <p>{title}</p>
    </button>
  );
}
