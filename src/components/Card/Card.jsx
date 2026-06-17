import "./Card.css";

export default function Card({ imgUrl, title, handleClick, devClicked }) {
  return (
    <button
      className="card"
      onClick={handleClick}
      data-dev-clicked={devClicked}
    >
      <img src={imgUrl} alt="" />
      <p>{title}</p>
    </button>
  );
}
