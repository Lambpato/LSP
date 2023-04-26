import HomePage from '../components/HomePage';

  const icons = [{
    id: 1,
    name: 'Settings',
    imgUrl: "../icons/Settings",
    children: [{
      childId: 1,
      name: 'Language',
      childUrl: "../icons/Language"
    }]
  },
  {
    id: 2,
    name: 'Photos',
    imgUrl: '../icons/Photos.png',
    children: [{
      childId: 1,
      name: 'Camera',
      childUrl: '../icons/camera.png'
    },{
      childId: 2,
      name: 'Saved Photos',
      childUrl: '../public/icons/Data'
    }]
  },
  {
    id: 3,
    name: 'Music',
    imgUrl: '../icons/Music',
      children: [{
        childId: 1,
        name:'New Song',
        childUrl: '../public/icons/Plus'
      }, {
        childId: 2,
        name: 'Saved Songs',
        childUrl: '../public/icons/Data'
      }]
}];

export default function HomepagePage () {
  return (
    <HomePage icons={icons} />
  )
}
