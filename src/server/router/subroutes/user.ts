import { z } from "zod";
import { createProtectedRouter } from "../protected-router";

export const userRouter = createProtectedRouter()
  .mutation("deleteStreamlabsToken", {
    async resolve({ ctx }) {
      await ctx.prisma.streamLabsToken.delete({
        where: {
          userId: ctx.session.user.id,
        },
      });

      return;
    },
  })
  .mutation("saveTimerSettings", {
    input: z.object({
      totalDonations: z.number(),
      totalMembers: z.number(),
      totalSuperchat: z.number(),
      donationsOn: z.boolean(),
      subscribersOn: z.boolean(),
      membersOn: z.boolean(),
      superchatOn: z.boolean(),
      perDonation: z.number(),
      secondsDonation: z.number(),
      perSuperchat: z.number(),
      secondsSuperchat: z.number(),
      member1Name: z.string(),
      member2Name: z.string(),
      member3Name: z.string(),
      member4Name: z.string(),
      member5Name: z.string(),
      member6Name: z.string(),
      member1Secoonds: z.number(),
      member2Secoonds: z.number(),
      member3Secoonds: z.number(),
      member4Secoonds: z.number(),
      member5Secoonds: z.number(),
      member6Secoonds: z.number(),
      secondsSubscriber: z.number(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.timerSettings.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: input,
      });
    },
  })
  .mutation("deleteAccount", {
    async resolve({ ctx }) {
      await ctx.prisma.account.deleteMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.session.deleteMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.streamLabsToken.deleteMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.timerSettings.deleteMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      await ctx.prisma.user.deleteMany({
        where: {
          id: ctx.session.user.id,
        },
      });
    },
  });
