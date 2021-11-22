# Contributing

You want to contribute to the project? Awesome!

## Things to know

By contributing to this repository, you are expected to know and follow the rules of laid out in our [Code of Conduct][coc].

**Working on your first Pull Request?**
[How to Contribute to an Open Source Project on GitHub][egghead]





## How do

* Project setup?
	[We've got you covered!](#project-setup)

* Found a bug?
	[Let us know!][bugs]

* Want a new feature?
	[Hook us up with the deets!][feature-request]

* Patched a bug?
	[Make a PR!][new-pr]





## Project setup

1. Fork and clone the repo
1. Create a branch for your PR
1. Run `yarn install` to install Node dependencies

<!-- **NOTE:** Use of NPM is **NOT** supported by this repository. -->

> Tip: Keep your `main` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/trezy/next-safe.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `main`
> branch to use the upstream main branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `main`
> branch. Whenever you want to update your version of `main`, do a regular
> `git pull`.





## Being added as a contributor

When you create your first PR we will add you as a contributor as per [All Contributors][all-contributors] convention.
If you have made a bug report, you will be added along with the PR that fixes the bug. (Assuming you have a GitHub account!)

If you do not wish to be added, please let us know.

### Commit conventions

We use an interpretation of the angular commit conventions in this project. Generally speaking, all commits should follow this pattern:
```
type(filename): commit message
```
* **type** - The type of work done in the commit. See below for types.
* **filename** - Should be the name of the file being modified minus the extension.
* **commit message** - Should quickly summarize changes made. If there are multiple changes, multiline commit messages are allowed to fully summarize changes made.

Commits should be as small as possible, with exceptions for large sweeping changes required by lint rule changes, package updates, etc.

If the commit **must** make changes to two or more **completely unrelated** files, the component name and parentheses are not required.

### Commit types
* `feat` - New feature.
* `fix` - Bug fix.
* `refactor` - A change in behavior of existing code.
* `docs` - A change in project documentation.
* `style` - Fixes which **only** fix code style and not behavior.
* `chore` - Maintenance tasks such as updating dependencies.





[all-contributors]: https://github.com/kentcdodds/all-contributors
[bugs]: https://github.com/trezy/next-safe/issues/new?assignees=&labels=bug&template=BUG_REPORT.yml&title=
[coc]: CODE_OF_CONDUCT.md
[feature-request]: https://github.com/trezy/next-safe/issues/new?assignees=&labels=enhancement&template=FEATURE_REQUEST.yml&title=
[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[new-pr]: https://github.com/trezy/next-safe/compare
[yarn2install]: https://yarnpkg.com/getting-started
