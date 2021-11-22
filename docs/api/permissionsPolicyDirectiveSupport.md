## `permissionsPolicyDirectiveSupport`

### Default

```js
{
	permissionsPolicyDirectiveSupport: ["proposed", "standard"],
}
```

### Description

The `Permissions-Policy` header has had a bit of a rocky history, and as such the list of features/permissions has changed *a lot*. To help manage this, `next-safe` provides 4 different sets of directive support.

To include a list of directives, add it to the `permissionsPolicyDirectiveSupport` array. For example, to add support for experimental directives:

```js
{
	permissionsPolicyDirectiveSupport: ["proposed", "standard", "experimental"],
}
```

Expand the sections below to find the list of features included in each of the 4 directive sets.

<details>
	<summary><code>standard</code></summary>
	<ul>
		<li><code>accelerometer</code></li>
		<li><code>ambient-light-sensor</code></li>
		<li><code>autoplay</code></li>
		<li><code>battery</code></li>
		<li><code>camera</code></li>
		<li><code>cross-origin-isolated</code></li>
		<li><code>display-capture</code></li>
		<li><code>document-domain</code></li>
		<li><code>encrypted-media</code></li>
		<li><code>execution-while-not-rendered</code></li>
		<li><code>execution-while-out-of-viewport</code></li>
		<li><code>fullscreen</code></li>
		<li><code>geolocation</code></li>
		<li><code>gyroscope</code></li>
		<li><code>magnetometer</code></li>
		<li><code>microphone</code></li>
		<li><code>midi</code></li>
		<li><code>navigation-override</code></li>
		<li><code>payment</code></li>
		<li><code>picture-in-picture</code></li>
		<li><code>publickey-credentials-get</code></li>
		<li><code>screen-wake-lock</code></li>
		<li><code>sync-xhr</code></li>
		<li><code>usb</code></li>
		<li><code>web-share</code></li>
		<li><code>xr-spatial-tracking</code></li>
	</ul>
</details>

<details>
	<summary><code>proposed</code></summary>
	<ul>
		<li><code>clipboard-read</code></li>
		<li><code>clipboard-write</code></li>
		<li><code>gamepad</code></li>
		<li><code>speaker-selection</code></li>
</details>

<details>
	<summary><code>experimental</code></summary>
	<ul>
		<li><code>conversion-measurement</code></li>
		<li><code>focus-without-user-activation</code></li>
		<li><code>hid</code></li>
		<li><code>idle-detection</code></li>
		<li><code>serial</code></li>
		<li><code>sync-script</code></li>
		<li><code>trust-token-redemption</code></li>
		<li><code>vertical-scroll</code></li>
	</ul>
</details>

<details>
	<summary><code>legacy</code></summary>
	<ul>
		<li><code>animations</code></li>
		<li><code>document-write</code></li>
		<li><code>image-compression</code></li>
		<li><code>layout-animations</code></li>
		<li><code>legacy-image-formats</code></li>
		<li><code>max-downscaling-image</code></li>
		<li><code>notifications</code></li>
		<li><code>oversized-images</code></li>
		<li><code>push</code></li>
		<li><code>speaker</code></li>
		<li><code>unsized-media</code></li>
		<li><code>vibrate</code></li>
		<li><code>vr</code></li>
		<li><code>wake-lock</code></li>
		<li><code>webauthn</code></li>
		<li><code>web-share</code></li>
	</ul>
</details>
