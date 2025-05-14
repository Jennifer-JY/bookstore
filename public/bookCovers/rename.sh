#!/bin/bash

# Loop through files that start with 2. to 12.
for i in {2..12}; do
  for file in "$i."*; do
    # Check if file exists
    [ -e "$file" ] || continue

    # Remove the number and the dot
    newname="${file#"$i. "}"  # handles "2. UUID.jpg"
    [ "$newname" = "$file" ] && newname="${file#"$i."}"  # fallback: handles "2.UUID.jpg"

    mv "$file" "$newname"
    echo "Renamed $file → $newname"
  done
done
