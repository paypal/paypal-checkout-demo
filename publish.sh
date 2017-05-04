#!/bin/sh

set -e;

rm src/app/build/*;
git checkout src/app/build/;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

npm run build;

git add src/app/build --all;

git commit -m "Dist" || echo "Nothing to distribute";

npm version ${1-patch};

git push;
git push --tags;
npm publish;
