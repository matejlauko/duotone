#!/bin/bash

turbo run build

rm -rf public/examples
mkdir -p public/examples

mv examples/chakraui/duotone-dist public/examples/chakraui/
mv examples/duotone/duotone-dist public/examples/duotone/
mv examples/preview/dist public/examples/preview/
mv examples/styled-components/duotone-dist public/examples/styled-components/
