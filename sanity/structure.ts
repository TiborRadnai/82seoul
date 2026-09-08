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