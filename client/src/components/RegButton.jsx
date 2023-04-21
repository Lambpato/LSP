export default function RegButton ({handleClick, name}) {
  return (
    <button className='rounded-pill mb-4 btn btn-primary bg-light border border-dark' type="button" onClick={handleClick}>{name}</button>
)
}
