# lighter-image-files

Encourages to use WebP and SVG format of image files in CSS code.

Image files inside web application should be in WebP and SVG format. These formats can crunch large images down into more manageable file sizes. They are on average much smaller than GIF, JPEG, PNG, even at extremely high resolutions. We can achieve up to 75% reduction of file size using SVG instead of JPG and up to 94% in case of PNG. For WebP format we get up to 60% reduction of file size in case of converting from JPG and up to 91% for PNG.

# CO2 reduction

Convertion of an exemplary image in 1800 x 1200 resolution from PNG to SVG format can reduce the carbon footprint by about 0.72 g CO2 per website view.

The table below shows comparison between file sizes and CO2 emission for exemplary image (displayed below) in 1800 x 1200 resolution for the most popular image formats.

![alt text](https://github.com/ec0lint/ec0lint-style/blob/main/exemplary_image.webp)

![alt text](https://github.com/ec0lint/ec0lint-style/blob/main/image_table.webp)

By multiplying the file size by the end-user traffic (0.81 kWh / 1000 Mb) and by the energy emissions (442 g/kWh), the carbon footprint of the exemplary PNG file (2.1 MB) – sums up to 0.76 g. The same image in SVG format (126 kB) generates 0.04g CO2. So, by substracting 0.04 g from 0.76 g we get 0.72g of savings. (95% less CO2).

For the same exemplary image in WebP (200 kB) the carbon footprint amounts to 0.07g. So, by subtracting 0.07 g from 0.76 g we get 0.69 g (91% less CO2).

Exemplary image was downloaded from https://wallpaperaccess.com/1800x1200-hd and converted to different formats using https://cloudconvert.com/

# examples

<!-- prettier-ignore -->
```css
background-image: url('image.ps');
/**                           ↑
    * Unrecommended format of image file*/
```

The following patterns are considered problems:

<!-- prettier-ignore -->
```css
background-image: url('image.ppm');
```

<!-- prettier-ignore -->
```css
background-image: url('image.ps')
```

<!-- prettier-ignore -->
```css
background-image: url('image.rgb')
```

<!-- prettier-ignore -->
```css
background-image: url('image.png')
```

The following patterns are _not_ considered problems:

<!-- prettier-ignore -->
```css
background-image: url('image.svg')
```

<!-- prettier-ignore -->
```css
background-image: url('image.webp')
```

<!-- prettier-ignore -->
```css
background-image: url('image.gif')
```

<!-- prettier-ignore -->
```css
background-image: url('image.jpg')
```
