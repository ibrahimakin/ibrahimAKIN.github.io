window.addEventListener('load', () => {
  let targetClassName = 'flex-wrap-anim';
  let defaultDuration = '0.3s';

  let dummyList = [];
  function addDummy(item, duration) {
    let top = item.offsetTop;
    let left = item.offsetLeft;
    setTimeout(() => {
      item.style.position = 'absolute';
      item.style.top = top + 'px';
      item.style.left = left + 'px';

      let dummyDiv = document.createElement('div');
      dummyDiv.classList.add(targetClassName + '-dummy');
      let rect = item.getBoundingClientRect();
      dummyDiv.style.width = rect.width + 'px';
      dummyDiv.style.height = rect.height + 'px';
      dummyDiv.style.visibility = 'hidden';
      dummyDiv['__' + targetClassName + '_pair'] = item;
      dummyDiv['__' + targetClassName + '_duration'] = duration;
      item.parentNode.appendChild(dummyDiv);
      dummyList.push(dummyDiv);
    }, 0);
  }

  let conts = document.getElementsByClassName(targetClassName);
  for (let i = 0, max = conts.length; i < max; i++) {
    let cont = conts[i];
    cont.style.position = 'relative';
    let duration = cont.getAttribute('data-duration') || defaultDuration;
    let items = cont.getElementsByTagName('div');
    for (let i = 0, max = items.length; i < max; i++) {
      addDummy(items[i], duration);
    }
  }

  window.addEventListener('resize', () => {
    dummyList.forEach(dummyDiv => {
      let item = dummyDiv['__' + targetClassName + '_pair'];
      let duration = dummyDiv['__' + targetClassName + '_duration'];
      if (item.offsetTop != dummyDiv.offsetTop) {
        item.style.transition = 'all ' + duration;
        item.style.top = dummyDiv.offsetTop + 'px';
        item.style.left = dummyDiv.offsetLeft + 'px';
      } else {
        item.style.transition = '';
        item.style.left = dummyDiv.offsetLeft + 'px';
      }
    });
  });
});