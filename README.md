<div style="text-align: center">
    <h1>Passaporte!</h1>
Automation bot for attempting to catch the highly coveted appointment at Portugal's Embassy in Tel Aviv.
</div>

Derp.

This bot uses Puppeteer. If you're running WSL/Ubuntu and you're facing issues launching Chromium, do this:

```
@ref https://github.com/actions/virtual-environments/issues/732#issuecomment-614809415

$ sudo apt-get update
$ sudo apt-get install -y libgbm-dev
```

---

## Set up

1. You'll first need to create a `.env` file in the root directory of the project and fill out the missing variables:

```
USER_GENERATED_ID='1234567890'`
USER_DOB='01-01-1900'
SECOND_PERSON_NAME='Brother/Sister Name'
SECOND_PERSON_DOCUMENT_NUMBER='10000'
SECOND_PERSON_DOB='01-01-1900'
```

2. Manipulate the code to your liking...

3. Run

   `$ node check.js`
