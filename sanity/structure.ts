// sanity/structure.ts
import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Tartalom')
    .items([
      // K-POP Mappa
      S.listItem()
        .title('K-Pop')
        .child(
          S.list()
            .title('K-Pop Tartalom')
            .items([
              S.documentTypeListItem('artist').title('Előadók / Bandák'),
            ])
        ),

      // K-DRAMA Mappa
      S.listItem()
        .title('K-Drama & Movies')
        .child(
          S.list()
            .title('K-Drama Tartalom')
            .items([
              S.documentTypeListItem('drama').title('Filmek / Sorozatok'),
              S.documentTypeListItem('actor').title('Színészek'),
            ])
        ),

      // K-FOOD Mappa
      S.listItem()
        .title('K-Food & Gasztro')
        .child(
          S.list()
            .title('K-Food Tartalom')
            .items([
              S.documentTypeListItem('recipe').title('Receptek'),
              S.documentTypeListItem('kFoodProduct').title('Termékek & Italok'),
            ])
        ),

      // WEBSHOP Mappa (Kategóriákra bontva) - ITT VOLTAK A HIÁNYZÓ API VERZIÓK
      S.listItem()
        .title('Webshop (K-Beauty)')
        .child(
          S.list()
            .title('Webshop Menü')
            .items([
              S.listItem()
                .title('Összes Termék')
                .child(S.documentTypeList('shopProduct').title('Összes Termék')),
              
              S.divider(),

              S.listItem()
                .title('Arckrémek & Hidratálók')
                .child(
                  S.documentList()
                    .title('Arckrémek')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arckrém & Hidratáló"')
                    .apiVersion('2023-05-03') // <--- HIÁNYZOTT
                ),
              S.listItem()
                .title('Szérumok & Esszenciák')
                .child(
                  S.documentList()
                    .title('Szérumok')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Szérum & Esszencia"')
                    .apiVersion('2023-05-03') // <--- HIÁNYZOTT
                ),
              S.listItem()
                .title('Arctisztítók')
                .child(
                  S.documentList()
                    .title('Arctisztítók')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arctisztító"')
                    .apiVersion('2023-05-03') // <--- HIÁNYZOTT
                ),
              S.listItem()
                .title('Arcmaszkok & Peelingek')
                .child(
                  S.documentList()
                    .title('Arcmaszkok')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arcmaszk & Peeling"')
                    .apiVersion('2023-05-03') // <--- HIÁNYZOTT
                ),
              S.listItem()
                .title('Smink & Egyéb')
                .child(
                  S.documentList()
                    .title('Smink & Egyéb')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Smink & Egyéb"')
                    .apiVersion('2023-05-03') // <--- HIÁNYZOTT
                ),
            ])
        ),

      // ÜGYFELEK ÉS MARKETING Mappa
      S.listItem()
        .title('Ügyfelek & Marketing')
        .child(
          S.list()
            .title('Marketing és Adatok')
            .items([
              // Aktív vásárlók (ahol a státusz nem archivált, vagy nincs még státusz megadva)
              S.listItem()
                .title('Regisztrált Felhasználók')
                .child(
                  S.documentList()
                    .title('Aktív Felhasználók')
                    .schemaType('customer')
                    .filter('_type == "customer" && (status != "archived" || !defined(status))')
                    .apiVersion('2023-05-03')
                ),

              // Archivált vásárlók (akiknél a státusz át lett állítva "archived"-ra)
              S.listItem()
                .title('Archivált Felhasználók')
                .child(
                  S.documentList()
                    .title('Archivált Fiókok (Adóügyi megőrzés)')
                    .schemaType('customer')
                    .filter('_type == "customer" && status == "archived"')
                    .apiVersion('2023-05-03')
                ),

              S.divider(),

              // Hírlevél feliratkozók marad a helyén
              S.documentTypeListItem('newsletterSubscriber').title('Hírlevél Feliratkozók'),
            ])
        ),
    ]);