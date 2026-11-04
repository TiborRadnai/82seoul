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
              // 1. Receptek kategóriákra bontva
              S.listItem()
                .title('Receptek')
                .child(
                  S.list()
                    .title('Recept Kategóriák')
                    .items([
                      S.listItem()
                        .title('Összes Recept')
                        .child(S.documentTypeList('recipe').title('Összes Recept')),
                      
                      S.divider(),

                      S.listItem()
                        .title('Főételek')
                        .child(
                          S.documentList()
                            .title('Főételek')
                            .schemaType('recipe')
                            .filter('_type == "recipe" && subCategory == "Hauptgerichte"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Levesek & Egytálételek')
                        .child(
                          S.documentList()
                            .title('Levesek & Egytálételek')
                            .schemaType('recipe')
                            .filter('_type == "recipe" && subCategory == "Suppen & Eintöpfe"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Street Food')
                        .child(
                          S.documentList()
                            .title('Street Food')
                            .schemaType('recipe')
                            .filter('_type == "recipe" && subCategory == "Street Food"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Desszertek & Sütemények')
                        .child(
                          S.documentList()
                            .title('Desszertek & Sütemények')
                            .schemaType('recipe')
                            .filter('_type == "recipe" && subCategory == "Desserts & Gebäck"')
                            .apiVersion('2023-05-03')
                        ),
                    ])
                ),
              
              // 2. Termékek & Italok (amit az előbb csináltunk)
              S.listItem()
                .title('Termékek & Italok')
                .child(
                  S.list()
                    .title('Termék Kategóriák')
                    .items([
                      S.listItem()
                        .title('Összes Termék')
                        .child(S.documentTypeList('kFoodProduct').title('Összes Termék')),
                      
                      S.divider(),

                      S.listItem()
                        .title('Italok & Soju')
                        .child(
                          S.documentList()
                            .title('Italok & Soju')
                            .schemaType('kFoodProduct')
                            .filter('_type == "kFoodProduct" && subCategory == "Getränke & Erfrischungen"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Nassolnivalók & Snackek')
                        .child(
                          S.documentList()
                            .title('Nassolnivalók & Snackek')
                            .schemaType('kFoodProduct')
                            .filter('_type == "kFoodProduct" && subCategory == "Snacks & Knabbereien"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Alapanyagok')
                        .child(
                          S.documentList()
                            .title('Alapanyagok')
                            .schemaType('kFoodProduct')
                            .filter('_type == "kFoodProduct" && subCategory == "Zutaten & Grundnahrungsmittel"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Szószok, Fűszerek & Tészták')
                        .child(
                          S.documentList()
                            .title('Szószok, Fűszerek & Tészták')
                            .schemaType('kFoodProduct')
                            .filter('_type == "kFoodProduct" && subCategory == "Würzsaucen, Gewürze & Nudeln"')
                            .apiVersion('2023-05-03')
                        ),
                      S.listItem()
                        .title('Édességek & Desszertek')
                        .child(
                          S.documentList()
                            .title('Édességek & Desszertek')
                            .schemaType('kFoodProduct')
                            .filter('_type == "kFoodProduct" && subCategory == "Süßwaren & Desserts"')
                            .apiVersion('2023-05-03')
                        ),
                    ])
                ),
            ])
        ),

      // K-TRAVEL Mappa
      S.listItem()
        .title('Korea Travel Portál')
        .child(
          S.list()
            .title('Utazási Szekciók')
            .items([
              // 1. Metropolis kategória
              S.listItem()
                .title('Metropolis & City Life')
                .child(
                  S.documentList()
                    .title('Metropolis Cikkek')
                    .schemaType('travelArticle')
                    .filter('_type == "travelArticle" && category == "city"')
                    .apiVersion('2023-05-03')
                ),

              // 2. Kultur kategória
              S.listItem()
                .title('Kultur & Tradition')
                .child(
                  S.documentList()
                    .title('Kultur Cikkek')
                    .schemaType('travelArticle')
                    .filter('_type == "travelArticle" && category == "culture"')
                    .apiVersion('2023-05-03')
                ),

              // 3. Natur kategória
              S.listItem()
                .title('Natur & Jeju')
                .child(
                  S.documentList()
                    .title('Natur Cikkek')
                    .schemaType('travelArticle')
                    .filter('_type == "travelArticle" && category == "nature"')
                    .apiVersion('2023-05-03')
                ),

              // 4. Guide kategória (az új sémát használva)
              S.listItem()
                .title('Travel Guide & Essentials')
                .child(
                  S.documentList()
                    .title('Kisokos Elemek')
                    .schemaType('travelGuideItem')
                    .filter('_type == "travelGuideItem"')
                    .apiVersion('2023-05-03')
                ),
            ])
        ),

      // WEBSHOP Mappa (Kategóriákra bontva)
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
                    .apiVersion('2023-05-03')
                ),
              S.listItem()
                .title('Szérumok & Esszenciák')
                .child(
                  S.documentList()
                    .title('Szérumok')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Szérum & Esszencia"')
                    .apiVersion('2023-05-03')
                ),
              S.listItem()
                .title('Arctisztítók')
                .child(
                  S.documentList()
                    .title('Arctisztítók')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arctisztító"')
                    .apiVersion('2023-05-03')
                ),
              S.listItem()
                .title('Arcmaszkok & Peelingek')
                .child(
                  S.documentList()
                    .title('Arcmaszkok')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Arcmaszk & Peeling"')
                    .apiVersion('2023-05-03')
                ),
              S.listItem()
                .title('Smink & Egyéb')
                .child(
                  S.documentList()
                    .title('Smink & Egyéb')
                    .schemaType('shopProduct')
                    .filter('_type == "shopProduct" && category == "Smink & Egyéb"')
                    .apiVersion('2023-05-03')
                ),
            ])
        ),

      S.divider(),

      // 1. FŐ ÁG: RENDELÉSEK MAPPA (Külön a logisztikának)
      S.listItem()
        .title('Rendelések')
        .child(
          S.list()
            .title('Rendelések Kezelése')
            .items([
              S.listItem()
                .title('Minden Rendelés (Időrendben)')
                .child(
                  S.documentList()
                    .title('Összes Rendelés')
                    .schemaType('order')
                    .filter('_type == "order"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                    .apiVersion('2023-05-03')
                ),
              S.listItem()
                .title('Rendelések Vásárlóink Szerint')
                .child(
                  S.documentTypeList('customer')
                    .title('Válassz Vásárlót')
                    .filter('_type == "customer"')
                    .apiVersion('2023-05-03')
                    .child((customerId) =>
                      S.documentList()
                        .title('Ügyfél Rendelései')
                        .schemaType('order')
                        .filter('_type == "order" && (customerEmail == *[_id == $custId][0].email || userId == *[_id == $custId][0].userId)')
                        .params({ custId: customerId })
                        .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                        .apiVersion('2023-05-03')
                    )
                ),
            ])
        ),

      // 2. FŐ ÁG: ÜGYFELEK & MARKETING MAPPA (Külön a felhasználóknak és hírlevélnek)
      S.listItem()
        .title('Ügyfelek & Marketing')
        .child(
          S.list()
            .title('Ügyfelek és Hírlevél')
            .items([
              S.listItem()
                .title('Regisztrált Felhasználók')
                .child(
                  S.documentList()
                    .title('Aktív Felhasználók')
                    .schemaType('customer')
                    .filter('_type == "customer" && (status != "archived" || !defined(status))')
                    .apiVersion('2023-05-03')
                ),
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
              S.documentTypeListItem('newsletterSubscriber').title('Hírlevél Feliratkozók'),
            ])
        ),
    ]);