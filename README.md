## Screens

- [x] `LoginScreen`
- [ ] `HomeScreen`
- [ ] `Add Food (Modal)` – eigener Screen/Flow zum Hinzufügen von Lebensmitteln
- [ ] `CalendarScreen`
- [ ] `FoodDatabaseScreen`
- [ ] `ProfileSettingsScreen`

## Components

### App / global

- [x] `AppShell` – Root-Layout, Tabs/Navigation
- [x] `Button` – wiederverwendbare Button-Component (Primary, Secondary, Text etc.)
- [x] `Input` – wiederverwendbares Text-/Zahlen-Eingabefeld (mit Label, Placeholder, optionaler Validierung)
- [ ] `FoodRow` – eine Zeile pro Lebensmittel (Name, Menge, Nährwerte, favorite Icon); wird auf Home, Add-Food-Modal und Food Database genutzt
- [ ] `ConfirmDialog` – für Delete

### Home

- [ ] `DaySwipePager` – horizontales Swipen zwischen Tagen
- [ ] `ProgressRing` – wiederverwendbarer Kreis (Kalorien/Protein)
- [ ] `MacroBadge` – kleiner KPI/Label für Ziel/Consumed
- [ ] `AddFoodFab` – Floating Action Button (öffnet Add-Food-Modal)
- [ ] `CreateFoodForm` – Formular zum Anlegen eines neuen Lebensmittels. Wird auf dem `Food Database`Screen und im `Add Food (Modal)` genutzt.

### Add Food (Modal)

- [ ] `FoodSearchInput`
- [ ] `FoodSearchList` – Suchergebnisse mit `FoodRow`
- [ ] `NumberInputRow` – generische Zahleneingabe (g, kcal/100g, protein/100g)

### Calendar

- [ ] `MonthlyCalendar` – Zeigt eine Monatsübersicht mit allen Tagen an. Jeder Tag kann farblich markiert werden (z.B. grün/gelb/rot je nach Ernährungsstatus), Auswahl eines Tages öffnet Details (z.B. im DayDetailDrawer). Nutzt optimalerweise die Bibliothek `react-native-calendars`.
- [ ] `DayDetailDrawer` (oder `DayDetailModal`)

### Food Database

- [ ] `FoodDatabaseList` – nutzt `FoodRow` + `FoodActionsMenu`
- [ ] `FoodActionsMenu` – edit/delete

### Profile / Settings

- [ ] `GoalInputForm`
- [ ] `GoalInputRow`

## Empfohlene Libraries (nur wo sinnvoll)

| Component         | Library                             | Hinweis                                                                                                                                                      |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DaySwipePager`   | `react-native-pager-view`           | Horizontaler Swipe, native ViewPager/UIPageViewController. Mit Expo: `npx expo install react-native-pager-view`. Web kann Probleme machen.                   |
| `ProgressRing`    | `react-native-svg`                  | Ring selbst zeichnen (Kreis + `strokeDashoffset`). Optional: `react-native-circular-progress` baut darauf auf. Mit Expo: `npx expo install react-native-svg` |
| `AddFoodFab`      | `react-native-paper`                | (bereits im Projekt) liefert `FAB`.                                                                                                                          |
| `ConfirmDialog`   | `react-native-paper`                | (bereits im Projekt) liefert `Dialog` für Bestätigungen.                                                                                                     |
| `MonthlyCalendar` | `react-native-calendars`            | Monatsansicht, `markedDates` für grün/gelb/rot, custom day styling.                                                                                          |
| `DayDetailDrawer` | `@gorhom/react-native-bottom-sheet` | Performanter Bottom-Sheet für Tagesdetails, gut mit Gesture Handler/Reanimated.                                                                              |

Alle anderen Components (Listen, Rows, Forms, EmptyState, etc.) mit Standard-React-Native + **react-native-paper** umsetzbar; keine Extra-Library nötig.

## Hilfsfunktionen / Utilities

- [ ] `calcTotalsForDay(entries)` → { calories, protein, grams }
- [ ] `calcFromPer100g({ per100, grams })`
- [ ] `calcProgress({ consumed, goal })` → 0..1
- [ ] `clamp(value, min, max)`
- [ ] `formatNumber(value)` / `formatGrams(value)`
- [ ] `getDayId(date)` → string key `YYYY-MM-DD`
- [ ] `parseDayId(id)` → Date
- [ ] `addDays(date, n)`
- [ ] `isSameDay(a,b)`
- [ ] `getDayStatus({ calories, protein, goals })` → "green"|"yellow"|"red"
- [ ] `sortFoods(favoritesFirst, searchQuery)`
- [ ] `filterFoodsByQuery(foods, query)`
- [ ] `toggleFavorite(foodId)`
- [ ] `buildFoodEntry({ foodId, grams, per100 })`
- [ ] `updateEntryAmount(entryId, grams)`
- [ ] `roundToStep(value, step)` – z.B. 5g Schritte
- [ ] `normalizeFoodInput(form)` – Zahlen/NaN/Minwerte

## Ideen

- [ ] `eigene theme.json` → so werden globale styles immer gleich bleiben in der ganzen App
- [ ] `deleteProfile` → ein Button in `ProfileSettingsScreen` um das Konto zu löschen
