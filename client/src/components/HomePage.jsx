import { useState } from 'react';

export default function HomePage ({ icons }) {
  const [isClicked, setClicked] = useState(true);
  const [current, setcurrent] = useState(0);

  // const togglePrev = () => setcurrent((current + 1) % icons.length);
  // const toggleNext = () => setcurrent(((current - 1) + icons.length) % icons.length);
  const toggleCurrent = (i) => {
    setcurrent(i);
    setClicked(!isClicked);
  };

  return (
    <div className="row position-absolute top-0 start-0 bottom-0 end-0">
      <div className="row">
        <CurrentIcon icons={icons} onClick={toggleCurrent} current={current} />
      </div>
    </div>
  );
};

 const CurrentIcon = ({ icons, onClick, current }) => {
    const dashboard = icons.map(icons =>
      <li onClick={() => onClick(icons.id)}
       key={icons.id}>
        <div><img href={icons.imgUrl} alt={icons.name}/></div>
        {current === icons.id ? icons.children.map(child =>
          <div className='row' key={child.childId}><span><img href={child.childUrl} alt={child.name} /></span> <p>{child.name}</p></div>)
          : undefined}
      </li>);
  return <ul className='list-unstyled list-group-horizontal'>{dashboard}</ul>
};
