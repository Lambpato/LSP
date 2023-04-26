import HomePage from '../components/HomePage';

  const icons = [{
    id: 1,
    name: 'Settings',
    imgUrl: '../../',
    children: [{
      childId: 1,
      name: 'Language',
      childUrl: "../../public/icons/Language.png"
    }]
  },
  {
    id: 2,
    name: 'Photos',
    imgUrl: '../../public/icons/menu-icons/Photos.png',
    children: [{
      childId: 1,
      name: 'Camera',
      childUrl: '../../public/icons/ui-icons/Camera'
    },{
      childId: 2,
      name: 'Saved Photos',
      childUrl: '../../public/icons/ui-icons/Data'
    }]
  },
  {
    id: 3,
    name: 'Music',
    imgUrl: '../../public/icons/menu-icons/Music',
      children: [{
        childId: 1,
        name:'New Song',
        childUrl: '../../public/icons/ui-icons/Plus'
      }, {
        childId: 2,
        name: 'Saved Songs',
        childUrl: '../../public/icons/ui-icons/Data'
      }]
}];

export default function HomepagePage () {
  return (
    <HomePage icons={icons} />
  )
}
