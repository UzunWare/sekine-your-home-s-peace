# Jawshan Kabir Audio Files

This folder is for Jawshan Kabir section audio recitations.

## File Naming Convention

Audio files should be named:
- `section-1.mp3` - Section 1 audio
- `section-2.mp3` - Section 2 audio
- ...
- `section-100.mp3` - Section 100 audio

## How to Enable Audio

1. Add your MP3 files to this folder with the naming convention above
2. Edit `src/data/jawshan.ts` and uncomment this line in `getJawshanAudioUrl`:
   ```typescript
   return `${JAWSHAN_AUDIO_BASE_URL}/section-${sectionNumber}.mp3`;
   ```

## Audio Sources

You can find Jawshan Kabir audio recitations from:
- [Duas.org](https://www.duas.org/jkabeer1.htm)
- [Al-Islam.org](https://al-islam.org/ar/media/dua-jawshan-al-kabir)
- [Sibtayn.com](https://www.sibtayn.com)

Note: Ensure you have proper rights to use any audio files.
