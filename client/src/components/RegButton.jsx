export default function RegButton ({handleClick, name}) {
  return (
    <button className='rounded-pill mb-4 btn fw-semibold border border-dark' type="button" onClick={handleClick}>{name}</button>
)
}
