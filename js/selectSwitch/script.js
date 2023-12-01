const select = document.querySelector('.selector__box');
const options = select.querySelectorAll('.selector__option');
const target = document.querySelector('.target__content');

const areaData = [
  {
    area: '',
    dom: '<h2>なし</h2>',
  },
  {
    area: '東京都（23区）',
    dom: '<h2>東京</h2>',
  },
  {
    area: '宮下',
    dom: '<h2>あいうえお</h2>',
  },
  {
    area: '千葉県',
    dom: '<h2>千葉</h2>',
  },
  {
    area: '神奈川県',
    dom: '<h2>神奈川</h2>',
  },
  {
    area: '埼玉県',
    dom: '<h2>埼玉</h2>',
  },
];

select.addEventListener('load', changeEvent());
select.addEventListener('change', changeEvent);
function changeEvent() {
  for (let i = 0; i < options.length; i++) {
    if (areaData[i].area != select.value) {
      continue;
    }

    target.innerHTML = areaData[i].dom;
  }
}
