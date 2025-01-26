
FROM node:18-alpine as builder

WORKDIR /app

# Declare build arguments
ARG NEXT_PUBLIC_PAYPAL_SECRET_KEY
ARG NEXT_PUBLIC_PAYPAL_CLIENT_ID
ARG REPLICATE_API_TOKEN
ARG GEMINI_API_KEY
ARG ASSEMBLYAI_API_KEY
ARG SUPABASE_KEY
ARG SUPABASE_URL
ARG SUPABASE_BUCKET_NAME
ARG RESEND_API_KEY
ARG DATABASE_URL

# Set environment variables from build arguments
ENV NEXT_PUBLIC_PAYPAL_SECRET_KEY=$NEXT_PUBLIC_PAYPAL_SECRET_KEY
ENV NEXT_PUBLIC_PAYPAL_CLIENT_ID=$NEXT_PUBLIC_PAYPAL_CLIENT_ID
ENV REPLICATE_API_TOKEN=$REPLICATE_API_TOKEN
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV ASSEMBLYAI_API_KEY=$ASSEMBLYAI_API_KEY
ENV SUPABASE_KEY=$SUPABASE_KEY
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_BUCKET_NAME=$SUPABASE_BUCKET_NAME
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV DATABASE_URL=$DATABASE_URL


COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Install production dependencies
RUN npm ci --omit=dev

# Stage 2: Runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json /app/.next /app/public ./

# Install production dependencies
RUN npm install --production

# Expose the port Next.js uses
EXPOSE 3000

# Set the Next.js environment
ENV NODE_ENV production

# Start the application
CMD ["npm", "run", "dev"]

