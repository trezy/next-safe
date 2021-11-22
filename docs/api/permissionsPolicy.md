## `permissionsPolicy`

### Description

`permissionsPolicy` controls the value of the `Permissions-Policy` header, as well as the legacy `Feature-Policy` header. This header is used to enable/disable certain features for a website.

By default, all features are set to `'none'` unless you tell `next-safe` otherwise.

Set to `false` to disable `Permissions-Policy` and `Feature-Policy` entirely.

To enable all policies (not recommended), check out the [`permissionsPolicyDirectiveSupport`](./permissionsPolicyDirectiveSupport.md) option
