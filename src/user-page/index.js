import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'

var main = document.getElementById('main-container')

page('/:username', loadUser, header, (ctx, next) => {
  title(`Platzigram - ${ctx.user.username}`)
  empty(main).appendChild(template(ctx.user))
})

page('/:username/:id', loadUser, header, (ctx, next) => {
  title(`Platzigram - ${ctx.user.username}`)
  empty(main).appendChild(template(ctx.user))
  $('.modal').modal({
    complete: () => {
      page(`/${ctx.params.username}`)
    }
  })
})

async function loadUser(ctx, next) {
  try {
    ctx.user = await fetch(`/api/user/:${ctx.params.username}`).then(res => res.json());
    next();
  }catch (err) {
    return console.log(err);
  }
}
