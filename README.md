# next-safe
<div align="center">
  <h1><code>next-safe</code></h1>
</div>

[![Version][version-badge]][package]
[![Bundle size][bundlephobia-badge]][bundlephobia]
[![Downloads][downloads-badge]][npmtrends]
[![BSD-3-Clause License][license-badge]][license]

[![Release status][release-status-badge]][release-status]
[![Test status][test-status-badge]][test-status]
[![Code Coverage][coveralls-badge]][coveralls]
[![Maintainability][codeclimate-badge]][codeclimate]

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![PRs Welcome][prs-badge]][prs]
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
[![Code of Conduct][code-of-conduct-badge]][code-of-conduct]
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]
<!-- [![Dependencies][daviddm-badge]][daviddm] -->

`next-safe` helps secure your Next.js apps by providing sensible defaults for the most common security headers, including:

* [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
* [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) (formerly known as `Feature-Policy`)
* [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
* [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
* [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
* [`X-XSS-Protection`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)

Check out the full documentation at https://trezy.gitbook.io/next-safe.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://trezy.com"><img src="https://avatars.githubusercontent.com/u/442980?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Trezy</b></sub></a><br /><a href="https://github.com/trezy/next-safe/issues?q=author%3Atrezy" title="Bug reports">🐛</a> <a href="https://github.com/trezy/next-safe/commits?author=trezy" title="Code">💻</a> <a href="#example-trezy" title="Examples">💡</a> <a href="#ideas-trezy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-trezy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-trezy" title="Maintenance">🚧</a> <a href="https://github.com/trezy/next-safe/pulls?q=is%3Apr+reviewed-by%3Atrezy" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/trezy/next-safe/commits?author=trezy" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/UncleClapton"><img src="https://avatars.githubusercontent.com/u/2686824?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cameron Welter</b></sub></a><br /><a href="https://github.com/trezy/next-safe/issues?q=author%3AUncleClapton" title="Bug reports">🐛</a> <a href="https://github.com/trezy/next-safe/commits?author=UncleClapton" title="Code">💻</a> <a href="#ideas-UncleClapton" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-UncleClapton" title="Maintenance">🚧</a> <a href="https://github.com/trezy/next-safe/commits?author=UncleClapton" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/zomars/"><img src="https://avatars.githubusercontent.com/u/3504472?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Omar López</b></sub></a><br /><a href="https://github.com/trezy/next-safe/commits?author=zomars" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/frattaro"><img src="https://avatars.githubusercontent.com/u/14955351?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anton Frattaroli</b></sub></a><br /><a href="https://github.com/trezy/next-safe/issues?q=author%3Afrattaro" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/april-ctrlspire"><img src="https://avatars.githubusercontent.com/u/79557092?v=4?s=100" width="100px;" alt=""/><br /><sub><b>april-ctrlspire</b></sub></a><br /><a href="#ideas-april-ctrlspire" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/JLucasCAmorim"><img src="https://avatars.githubusercontent.com/u/27377264?v=4?s=100" width="100px;" alt=""/><br /><sub><b>João Lucas Evangelista C. de Amorim</b></sub></a><br /><a href="https://github.com/trezy/next-safe/issues?q=author%3AJLucasCAmorim" title="Bug reports">🐛</a> <a href="https://github.com/trezy/next-safe/commits?author=JLucasCAmorim" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! Check out our [contributing docs](./CONTRIBUTING.md) for help getting started!





[bundlephobia]: https://bundlephobia.com/package/next-safe
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/next-safe?style=flat-square
[code-of-conduct]: CODE_OF_CONDUCT.md
[code-of-conduct-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[codeclimate]: https://codeclimate.com/github/trezy/next-safe
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/trezy/next-safe.svg?style=flat-square
[coveralls]: https://coveralls.io/github/trezy/next-safe
[coveralls-badge]: https://img.shields.io/coveralls/trezy/next-safe.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/next-safe.svg?style=flat-square
[github-watch]: https://github.com/trezy/next-safe/watchers
[github-watch-badge]: https://img.shields.io/github/watchers/trezy/next-safe.svg?style=social
[github-star]: https://github.com/trezy/next-safe/stargazers
[github-star-badge]: https://img.shields.io/github/stars/trezy/next-safe.svg?style=social
[license]: LICENSE
[license-badge]: https://img.shields.io/npm/l/next-safe.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/next-safe
[package]: https://npmjs.com/package/next-safe
[prs]: CONTRIBUTING.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[release-status]: https://github.com/trezy/next-safe/actions/workflows/release.yml
[release-status-badge]: https://img.shields.io/github/workflow/status/trezy/next-safe/Release?style=flat-square&label=release
[test-status]: https://github.com/trezy/next-safe/actions/workflows/test.yml
[test-status-badge]: https://img.shields.io/github/workflow/status/trezy/next-safe/Test?style=flat-square&label=tests
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20trezy/next-safe%20by%20%40PokebagApp%20https%3A%2F%2Fgithub.com%2FPokebag%2Fdata-sdk%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/trezy/next-safe.svg?style=social
[version-badge]: https://img.shields.io/npm/v/next-safe.svg?style=flat-square
