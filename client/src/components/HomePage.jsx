import { useState } from 'react';

export default function HomePage ({ icons }) {
  const [current, setCurrent] = useState(0);

  // const togglePrev = () => setcurrent((current + 1) % icons.length);
  // const toggleNext = () => setcurrent(((current - 1) + icons.length) % icons.length);
  const toggleCurrent = (i) => {
    current !== i ? setCurrent(i) : setCurrent(0);
  };

  return (
    <div>
      <div className="row">
        <CurrentIcon icons={icons} onClick={toggleCurrent} current={current} />
      </div>
    </div>
  );
};

 const CurrentIcon = ({ icons, onClick, current }) => {
    const dashboard = icons.map(icons =>
      <li className='list-item-group' onClick={() => onClick(icons.id)}
       key={icons.id}>
        <div><img style={{width: '100px'}} src={icons.imgUrl} alt={icons.name}/></div>
        {current === icons.id ? icons.children.map(child =>
          <div className='d-flex flex-row align-items-center gap-2 align-items-center' key={child.childId} onClick={child.onClick}><img src={child.childUrl} alt={child.name} /><p  className='text-secondary'>{child.name}</p></div>)
          : undefined}
      </li>);
  return <ul className='list-unstyled list-group list-group-horizontal d-flex align-items-center gap-5'>{dashboard}</ul>
};
