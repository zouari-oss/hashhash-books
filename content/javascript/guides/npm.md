# NPM Notes

- Configure npm to use a user-owned global directory and add the new npm global bin to your `$PATH`:

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```
